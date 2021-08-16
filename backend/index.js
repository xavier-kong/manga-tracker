const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const Manga = require('./models/manga')
const bcrypt = require('bcrypt')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

app.get('/api/manga', async (req, res) => {
  const token = getTokenFrom(req) // refactor into own function
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User
    .findById(decodedToken.id)
    .populate('recentMangas', 'users')
  // const info = user.recentMangas.map((manga) => {
  //   // const mangaInfo = await Manga.findById(manga)
  //   // const readInfo = await mangaInfo.users.filter(person => String(person.user._id) === user.id)
  //   // return readInfo[0]
  //   return `this is ${manga}`
  // })
  res.json(user)
})

app.post('/api/manga', async (req, res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const manga = await Manga.findOne({ title: req.body.title })
  const mangaUser = {
    user: user._id,
    chapter: 0,
    status: 'to start'
  }
  if (manga) {
    const userInManga = await manga.users.filter(person => String(person.user._id) === user.id)
    if (userInManga.length === 1) {
      res.json({ error: 'user already added manga to collection'})
    } else if (userInManga.length === 0) {
      manga.users = manga.users.concat(mangaUser)
      await manga.save()
      res.json(manga)
    }
  } else if (!manga) {
    const newManga = new Manga(req.body)
    newManga.users = newManga.users.concat(mangaUser)
    const savedManga = await newManga.save()
    res.json(savedManga)
  }
})

app.post('/api/users', async (req, res) => {
  const body = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

app.post('/api/login', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username of password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: 60*60*3 } // token expires in 3 hours
    )

  res
    .status(200)
    .send({ 
      token,
      username: user.username,
      name: user.name
    })
})

app.put('/api/manga/:id', async (req,res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const manga = await Manga.findById(req.params.id)
  const userIndex = manga.users.findIndex(person => String(person.user) === user.id)
  manga.users[userIndex].status = req.body.status
  manga.users[userIndex].chapter = req.body.chapter
  const savedManga = await manga.save()
  if (req.body.status === 'reading') {
    user.recentMangas = user.recentMangas.concat(savedManga.id)
    await user.save()
  } else {
    user.recentMangas = user.recentMangas.filter(manga => String(manga) !==  savedManga.id)
    await user.save()
  }
  res.json(manga)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

