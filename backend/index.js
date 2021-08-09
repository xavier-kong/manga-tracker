const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let data = [
  {
    "title": "더 페이블 ",
    "lastRead": "Just now",
    "current": 34,
    "link": "http://www.manga.com/1/",
    "id": 1,
    "status": "reading"
  },
  {
    "title": "극주부도",
    "lastRead": "Just now",
    "current": 15,
    "link": "http://www.manga.com/2/",
    "id": 2,
    "status": "finished"
  },
  {
    "title": "더 파이팅",
    "lastRead": "Just now",
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

app.post('/data', (req, res) => {
  const manga = { ...req.body, id: data.length+1}
  data = data.concat(manga)
  res.json(manga)
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