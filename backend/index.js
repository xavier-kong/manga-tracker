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



app.get('/', (req, res ) => {
  res.send('hello')
})

// app.get('/data', (req, res ) => {
//   res.send(data)
// })

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

app.post('/api/manga', async (req, res) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const manga = await Manga.findOne({ title: req.body.title })
  if (manga) {
    const userInManga = await manga.users.filter(person => String(person.user._id) === user.id)
    if (userInManga.length === 1) {
      res.json({ error: 'user already added manga to collection'})
    } else if (userInManga.length === 0) {
      const mangaUser = {
        user: user._id,
        chapter: 0,
        status: 'to start'
      }
      manga.users = manga.users.concat(mangaUser)
      await manga.save()
      res.json(manga)
    }
  } else if (!manga) {
    const newManga = new Manga(req.body)
    const mangaUser = {
      user: user._id,
      chapter: 0,
      status: 'to start'
    }
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

// app.put('/data/:id', (req, res) => {
//   const newManga = req.body
//   data = data.map(manga => manga.id === newManga.id ? newManga : manga)
//   res.json(newManga)
// })

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

