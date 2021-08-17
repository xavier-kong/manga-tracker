const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const Manga = require('./models/manga')
const bcrypt = require('bcrypt')
const loginRouter= require('./routers/loginRouter')
const mangaRouter= require('./routers/mangaRouter')
const usersRouter= require('./routers/usersRouter')

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

app.get('/api/user/mangas', async (req, res) => {
  const token = getTokenFrom(req) // refactor into own function?
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id).populate('mangas.manga')
  res.json(user)
})

app.put('/api/user', async (req,res) => {
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

app.use('/api/manga', mangaRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

