const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/mangas', async (req, res) => {
  res.json(req.user)
})

userRouter.put('/', async (req,res) => {
  const user = req.user
  const mangaIndex = await user.mangas.findIndex(manga => String(manga._id) === String(req.body._id))
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
  const updatedUser = await User.findById(req.user._id).populate('mangas.manga')
  res.json(updatedUser)
})

module.exports = userRouter