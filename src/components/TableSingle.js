import React, { useState, useEffect } from 'react'
import axios from 'axios'

const style = {
  textAlign: "center" 
}

const TableSingle = (data) => {
  const [ manga, setManga ] = useState('')
  const baseUrl = 'http://localhost:3001/api'
  
  useEffect(() => {
    !manga ? setManga(data.manga) : setManga(manga)
  },[data, manga])

  const buttonHandler = (e) => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    const token = `bearer ${user.token}`
    const config = {
      headers: { Authorization: token }
    }
    e.preventDefault()
    if (e.target.outerText === '<' ) {
      const newManga = { ...manga, chapter: manga.chapter-=1 }
      axios.put(`${baseUrl}/user`, newManga, config)
        .then(res => {
          setManga(res.data)
          data.alert(`${res.data.title} moved to previous chapter`)
        })
        .catch(e => {
          data.alert(`Error: ${e}`)
          console.log(e)
        })
    } else if (e.target.outerText === '>' ) {
      const newManga = { ...manga, chapter: manga.chapter+=1, lastRead: new Date() }
      axios.put(`${baseUrl}/user`, newManga, config)
        .then(res => {
          setManga(res.data)
          data.alert(`${res.data.title} moved to next chapter`)
        })
        .catch(e => {
          data.alert(`Error: ${e}`)
          console.log(e)
        })
    }
  }

  const handleFilterChange = (e) => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to mark ${manga.title} as ${e.target.value}`)) {
      const newManga = { ...manga, status: e.target.value }
      axios.put(`${baseUrl}/${manga.id}`, newManga)
        .then(res => {
          setManga(res.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const dateHandler = (date) => {
    const now = new Date()
    const last = new Date(date)
    const dateSeconds = (last).getTime()
    const s = ( now.getTime() - dateSeconds ) / 1000 //seconds
    if (s < 60) {
      return "just now"
    } else if (s < 60*60) {
      return `${Math.floor(s/60)} minute(s) ago`
    } else if (s < 60*60*24) {
      return `${Math.floor(s/(60*60))} hour(s) ago`
    } else if (s < 60*60*24*30) {
      return `${Math.floor(s/(60*60*24))} day(s) ago`
    } else if (s < 60*60*24*30*12) {
      return `${Math.floor(s/(60*60*24*30))} month(s) ago`
    } else {
      return `${Math.floor(s/(60*60*24*30*12))} year(s) ago`
    }
  } 

  return (
      <tr style={style}>
        <td>{manga.manga ? manga.manga.title : 'none'}</td>
        <td>{dateHandler(manga.lastRead)}</td>
        <td>
          <button onClick={buttonHandler}>{'<'}</button>
          &nbsp;{manga.chapter}&nbsp;
          <button onClick={buttonHandler}>{'>'}</button>
        </td>
        <td><a href={String(manga.link)}>Go</a></td>
        <td><button>open</button></td>
        <td>
          <select onChange={handleFilterChange}>
            {<option value={manga.status}>{manga.status}</option>}
            {manga.status === 'reading' ? null : <option value={'reading'}>Reading</option>}
            {manga.status === 'finished' ? null : <option value={'finished'}>Finished</option>}
            {manga.status === 'to start' ? null : <option value={'to start'}>To start</option>}
          </select>
        </td>
      </tr>
  )
}

export default TableSingle