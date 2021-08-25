const mangaRouter = require('express').Router()
//const Manga = require('../models/manga')
const User = require('../models/user')

mangaRouter.get('/', async (req, res) => {
  // const mangas = await Manga.find({})
  res.json(req.user.mangas) //dont even know if this is still needed?
})

mangaRouter.post('/', async (req, res) => {
  const user = req.user
  const mangaIndex = await user.mangas.findIndex(manga => String(manga.title) === String(req.body.title))
  if (mangaIndex) {
    res.json('manga already exists')
  } else if (!mangaIndex) {
    const body = req.body
    user.mangas.concat(
      {
        title: body.title,
        link: body.link,
        chapter: 1,
        lastRead: new Date(),
        status: "to start"
      }
    )
    await user.save()
    const updatedUser = await User.findById(req.user._id)
    res.json(updatedUser.mangas)
    
  }


  // const manga = await Manga.findOne({ title: req.body.title })
  // if (manga) {
  //   const mangaInUser = await user.mangas.filter(single => String(single.mangaId) === String(manga._id))
  //   if (mangaInUser.length === 1) {
  //     res.json({ error: 'user already added manga to collection'})
  //   } else if (mangaInUser.length === 0) {
  //     user.mangas = user.mangas.concat(mangaObjGen(manga))
  //     await user.save()
  //     const updatedUser = await User.findById(req.user._id).populate('mangas.manga')
  //     res.json(updatedUser)
  //   } 
  // } else if (!manga) {
  //   const newManga = new Manga(req.body)
  //   const savedManga = await newManga.save()
  //   user.mangas = user.mangas.concat(mangaObjGen(savedManga))
  //   await user.save()
  //   const updatedUser = await User.findById(req.user._id).populate('mangas.manga')
  //   res.json(updatedUser)
  // }
})

module.exports = mangaRouter