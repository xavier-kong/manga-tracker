const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { body } = req;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

usersRouter.get('/verify', async (req, res) => {
  res.json('valid');
});

module.exports = usersRouter;
