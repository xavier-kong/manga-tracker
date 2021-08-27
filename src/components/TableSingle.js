import React, { useState, useEffect } from 'react'
import useField from '../hooks/useField'
import axios from 'axios'

const style = {
  textAlign: "center" 
}

const TableSingle = (data) => {
  const [ manga, setManga ] = useState('')
  const [ visible, setVisible ] = useState(false)
  const link = useField('text')
  const baseUrl = 'http://localhost:3001/api/manga'
  
  useEffect(() => {
    !manga ? setManga(data.manga) : setManga(manga)
  },[data, manga])

  const user = JSON.parse(localStorage.getItem('loggedInUser'))
  const token = `bearer ${user.token}`
  const config = {
    headers: { Authorization: token }
  }

  const buttonHandler = (e) => {
    e.preventDefault()
    if (e.target.outerText === '<' ) {
      const newManga = { ...manga, chapter: manga.chapter-=1 }
      setManga(newManga)
      axios.put(baseUrl, newManga, config)
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
      setManga(newManga)
      axios.put(baseUrl, newManga, config)
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
      axios.put(baseUrl, newManga, config)
        .then(res => {
          setManga(res.data)
          data.alert(`${manga.title} set to ${e.target.value}`)
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

  const visibility = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newManga = { ...manga, link: link.value }
      axios.put(baseUrl, newManga, config)
        .then(res => {
          setManga(res.data)
          link.onSubmit()
          setVisible(!visible)
        })
        .catch(e => {
          console.log(e)
        })
  }

  return (
      <tr style={style}>
        <td>{manga.title || 'none'}</td>
        <td>{dateHandler(manga.lastRead)}</td>
        <td>
          <button onClick={buttonHandler}>{'<'}</button>
          &nbsp;{manga.chapter}&nbsp;
          <button onClick={buttonHandler}>{'>'}</button>
        </td>
        <td>
          {!visible ?
          <>
           <a href={String(manga.link)}>Go</a>  
           <button onClick={visibility}>Update</button>
          </> :
          <>
            <form onSubmit={handleSubmit}>
              link: <input {...link} />
              <button type='submit'>Update</button>
              <button onClick={visibility}>Cancel</button>
            </form>
          </>
          }
        </td>
        <td>
          <select onChange={handleFilterChange}>
            {<option value={manga.status}>{manga.status}</option>}
            {manga.status === 'reading' ? null : <option value={'reading'}>reading</option>}
            {manga.status === 'finished' ? null : <option value={'finished'}>finished</option>}
            {manga.status === 'to start' ? null : <option value={'to start'}>to start</option>}
            {manga.status === 'on hold' ? null : <option value={'on hold'}>on hold</option>}
          </select>
        </td>
        <td>
        </td>
      </tr>
  )
}

export default TableSingle