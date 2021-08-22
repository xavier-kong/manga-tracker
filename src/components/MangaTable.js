import React, { useEffect, useState } from 'react'
import TableSingle from './TableSingle'
import AddMangaForm from './AddMangaForm'
import Notifications from './Notifications'
import axios from 'axios'

let denotifyTimeout = 0

const MangaTable = () => {
  const [ data, setData ] = useState([])
  const [ filter, setFilter ] = useState('reading')
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    const token = `bearer ${user.token}`
    const config = {
      headers: { Authorization: token }
    }
    axios.get('http://localhost:3001/api/user/mangas', config).then(res =>{
      const newData = res.data
      setData(newData.mangas)
    })
  }, [filter])

  const onAdd = (manga) => {
    axios.post('http://localhost:3001/api/manga', manga)
      .then(res => {
        const newManga = res.data
        setData(data.concat(newManga))
        notificationHandler(`Added new manga ${newManga.title}`, setMessage)
      })
  }

  const notificationHandler = (message) => {
    clearTimeout(denotifyTimeout)
    denotifyTimeout = setTimeout(() => {setMessage('')}, 2500)
    setMessage(message)
  }

  return (
    <>
    <div>
      <Notifications message={message}/>
      <div>
        <button onClick={() => (setFilter('reading'))}>Reading</button>
        <button onClick={() => (setFilter('to start'))}>To start</button>
        <button onClick={() => (setFilter('finished'))}>Finished</button>
        <button onClick={() => (setFilter(''))}>All</button>
        &nbsp; currently viewing: &nbsp; {filter ? filter : "All"}
      </div>
      <table width='60%'>
        <tbody>
        <tr>
          <th><h3>Title</h3></th>
          <th><h3>Last Read</h3></th>
          <th><h3>Current</h3></th>
          <th>Link</th>
          <th>Open next 3</th>
          <th>Status</th>
        </tr>
        {data
          .filter(manga => manga.status.includes(filter))
          .map(manga =>
          <TableSingle manga={manga} key={manga._id} alert={(message) => notificationHandler(message)}/>
        )}
        </tbody>
      </table>
    </div>
    <div>
      <br />
      <AddMangaForm add={onAdd}/>
    </div>
    </>
  )
}

export default MangaTable