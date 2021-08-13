const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Manga = require('./models/manga')
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

let data = [
  {
    "title": "더 페이블 ",
    "lastRead": "2021-08-10T17:35:00",
    "current": 34,
    "link": "http://www.manga.com/1/",
    "id": 1,
    "status": "reading"
  },
  {
    "title": "극주부도",
    "lastRead": "2021-01-08T17:05:00",
    "current": 15,
    "link": "http://www.manga.com/2/",
    "id": 2,
    "status": "finished"
  },
  {
    "title": "더 파이팅",
    "lastRead": "2021-08-09T17:05:00",
    "current": 5,
    "link": "http://www.manga.com/3/",
    "id": 3,
    "status": "to start"
  }
]

app.get('/', (req, res ) => {
  res.send('hello')
})

app.get('/data', (req, res ) => {
  res.send(data)
})

app.post('/data', async (req, res) => {
  // const manga = { ...req.body, id: data.length+1, lastRead: Date()}
  // data = data.concat(manga)
  // res.json(manga)
  const manga = new Manga({ ...req.body, lastRead: Date()})
  const savedManga = await manga.save()
  res.json(savedManga)
})

app.put('/data/:id', (req, res) => {
  const newManga = req.body
  data = data.map(manga => manga.id === newManga.id ? newManga : manga)
  res.json(newManga)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})