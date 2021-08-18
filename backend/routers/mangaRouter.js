const mangaRouter = require('express').Router()
const Manga = require('../models/manga')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

mangaRouter.get('/all', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const mangas = await Manga.find({})
  res.json(mangas)
})

mangaRouter.post('/', async (req, res) => {
  const token = req.token
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
        manga: manga._id,
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
      manga: savedManga._id,
      chapter: 1,
      lastRead: new Date(),
      status: "to start"
    }
    user.mangas = user.mangas.concat(addedManga)
    await user.save()
    res.json(user)
  }
})

module.exports = mangaRouter