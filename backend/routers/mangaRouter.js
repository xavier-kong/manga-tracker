const mangaRouter = require('express').Router();
const User = require('../models/user');

mangaRouter.get('/', async (req, res) => {
  res.json(req.user.mangas);
});

mangaRouter.post('/', async (req, res) => {
  const { user } = req;
  const mangaIndex = await user.mangas.findIndex((manga) => String(manga.title) === String(req.body.title));
  if (mangaIndex !== -1 && user.mangas.length >= 0) {
    res.json('manga already exists');
  } else if (mangaIndex === -1) {
    const { body } = req;
    user.mangas = user.mangas.concat(
      {
        title: body.title,
        link: body.link,
        chapter: 1,
        lastRead: new Date(),
        status: 'to start',
      },
    );
    await user.save();
    const updatedUser = await User.findById(req.user._id);
    res.json(updatedUser.mangas);
  }
});

mangaRouter.put('/', async (req, res) => {
  const { user } = req;
  const mangaIndex = await user.mangas.findIndex((manga) => String(manga._id) === String(req.body._id));
  if (req.body.status) {
    user.mangas[mangaIndex].status = req.body.status;
  }
  if (req.body.chapter) {
    user.mangas[mangaIndex].chapter = req.body.chapter;
  }
  if (req.body.lastRead) {
    user.mangas[mangaIndex].lastRead = req.body.lastRead;
  }
  if (req.body.link) {
    user.mangas[mangaIndex].link = req.body.link;
  }
  await user.save();
  const updatedUser = await User.findById(req.user._id);
  res.json(updatedUser.mangas[mangaIndex]);
});

module.exports = mangaRouter;
