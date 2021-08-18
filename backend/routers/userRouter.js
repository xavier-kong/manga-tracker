const userRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

userRouter.get('/mangas', async (req, res) => {
  const token = getTokenFrom(req) // refactor into own function?
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id).populate('mangas.manga')
  res.json(user)
})

userRouter.put('/', async (req,res) => {
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
  await user.save()
  const updatedUser = await User.findById(decodedToken.id).populate('mangas.manga')
  res.json(updatedUser)
})

module.exports = userRouter