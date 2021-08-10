import React, { useState, useEffect } from 'react'
import axios from 'axios'

const style = {
  textAlign: "center" 
}

const TableSingle = (data) => {
  const [ manga, setManga ] = useState('')
  
  useEffect(() => {
    setManga(data.manga)
  },[data])

  const buttonHandler = (e) => {
    e.preventDefault()
    if (e.target.outerText === '<' ) {
      const newManga = { ...manga, current: manga.current-=1 }
      setManga(newManga)
    } else if (e.target.outerText === '>' ) {
      const newManga = { ...manga, current: manga.current+=1 }
      setManga(newManga)
    }
  }

  const handleFilterChange = (e) => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to mark ${manga.title} as ${e.target.value}`)) {
      const newManga = { ...manga, status: e.target.value }
      axios.put(`http://localhost:3001/data/${manga.id}`, newManga)
        .then(res => {
          setManga(res.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  return (
      <tr style={style}>
        <td>{manga.title}</td>
        <td>{manga.lastRead}</td>
        <td>
          <button onClick={buttonHandler}>{'<'}</button>
          &nbsp;{manga.current}&nbsp;
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