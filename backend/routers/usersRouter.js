const userRouter = require('express').Router()
const Manga = require('../models/manga')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

userRouter.post('/api/users', async (req, res) => {
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


module.exports = userRouter