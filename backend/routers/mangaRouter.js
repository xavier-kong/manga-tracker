const mangaRouter = require('express').Router()
const Manga = require('../models/manga')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

mangaRouter.get('/all', async (req, res) => {
  const token = getTokenFrom(req) // refactor into own function?
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const mangas = await Manga.find({})
  res.json(mangas)
})


module.exports = mangaRouter