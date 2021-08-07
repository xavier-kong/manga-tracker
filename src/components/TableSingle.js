import React, { useState, useEffect } from 'react'

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
    if (e.target.outerText === 'previous' ) {
      const newManga = { ...manga, current: manga.current-=1 }
      setManga(newManga)
    } else if (e.target.outerText === 'next' ) {
      const newManga = { ...manga, current: manga.current+=1 }
      setManga(newManga)
    }
  }

  return (
      <tr style={style}>
        <td>{manga.title}</td>
        <td>{manga.lastRead}</td>
        <td><button onClick={buttonHandler}>previous</button></td>
        <td>{manga.current}</td>
        <td><button onClick={buttonHandler}>next</button></td>
        <td><a href={String(manga.link)}>Go</a></td>
        <td><button>open</button></td>
      </tr>
  )
}

export default TableSingle