const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const loginRouter= require('./routers/loginRouter')
const mangaRouter= require('./routers/mangaRouter')
const usersRouter= require('./routers/usersRouter')
const userRouter= require('./routers/userRouter')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

app.use('/api/manga', mangaRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/user', userRouter)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

