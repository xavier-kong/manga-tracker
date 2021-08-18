const mangaRouter = require('express').Router()
const Manga = require('../models/manga')
const User = require('../models/user')

const mangaObjGen = (manga) => {
  return {
    manga: manga._id,
    chapter: 1,
    lastRead: new Date(),
    status: "to start"
  }
}

mangaRouter.get('/all', async (req, res) => {
  const mangas = await Manga.find({})
  res.json(mangas)
})

mangaRouter.post('/', async (req, res) => {
  const user = req.user
  const manga = await Manga.findOne({ title: req.body.title })
  if (manga) {
    const mangaInUser = await user.mangas.filter(single => String(single.mangaId) === String(manga._id))
    if (mangaInUser.length === 1) {
      res.json({ error: 'user already added manga to collection'})
    } else if (mangaInUser.length === 0) {
      user.mangas = user.mangas.concat(mangaObjGen(manga))
      await user.save()
      const updatedUser = await User.findById(req.user._id).populate('mangas.manga')
      res.json(updatedUser)
    } 
  } else if (!manga) {
    const newManga = new Manga(req.body)
    const savedManga = await newManga.save()
    user.mangas = user.mangas.concat(mangaObjGen(savedManga))
    await user.save()
    const updatedUser = await User.findById(req.user._id).populate('mangas.manga')
    res.json(updatedUser)
  }
})

module.exports = mangaRouter