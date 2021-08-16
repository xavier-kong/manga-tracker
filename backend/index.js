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
  if (manga) {
    const mangaInUser = await user.mangas.filter(single => String(single.mangaId) === String(manga._id))
    if (mangaInUser.length === 1) {
      res.json({ error: 'user already added manga to collection'})
    } else if (mangaInUser.length === 0) {
      const addedManga = {
        mangaId: manga._id,
        id: user.mangas.length,
        chapter: 1,
        lastRead: new Date(),
        status: "to start"
      }
      user.mangas = user.mangas.concat(addedManga)
      await user.save()
      res.json(user)
    } 
  } else if (!manga) {
    const newManga = new Manga(req.body)
    const savedManga = await newManga.save()
    const addedManga = {
      mangaId: savedManga._id,
      id: user.mangas.length,
      chapter: 1,
      lastRead: new Date(),
      status: "to start"
    }
    user.mangas = user.mangas.concat(addedManga)
    await user.save()
    res.json(user)
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

app.put('/api/manga', async (req,res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const mangaIndex = await user.mangas.findIndex(manga => String(manga._id) === String(req.body.id))
  if (req.body.status) {
    user.mangas[mangaIndex].status = req.body.status
  }
  if (req.body.chapter) {
    user.mangas[mangaIndex].chapter = req.body.chapter
  }
  if (req.body.lastRead) {
    user.mangas[mangaIndex].lastRead = req.body.lastRead
  }
  const updatedUser = await user.save()
  res.json(updatedUser)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

