const verifyRouter = require('express').Router()

verifyRouter.get('/verify', async (req, res) => {
  res.json('valid')
})

module.exports = verifyRouter