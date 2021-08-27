import React, { useState } from 'react'

const StatsToggle = ({ data }) => {
  const [ visible, setVisible ] = useState(false)

  const read = data.reduce((a,b) => a + b.chapter, 0)
  const titles = data.length
  const finished = data.filter(manga => manga.status === 'finished').length
  const reading = data.filter(manga => manga.status === 'reading').length
    
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>{visible ? 'Hide Stats' : 'Show Stats'}</button>
      {visible 
      ? 
      <div>
        <p>Chapters read: {read}</p>
        <p>Mangas in collection: {titles}</p>
        <p>Mangas finished: {finished}</p>
        <p>Mangas current reading: {reading}</p>
      </div>
      :
      null}
    </div>
  )
}

export default StatsToggle
