import React, { useEffect, useState } from 'react'
import TableSingle from './TableSingle'
import AddMangaForm from './AddMangaForm'
import axios from 'axios'

const MangaTable = () => {
  const [ data, setData ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/data').then(res =>{
      const newData = res.data
      setData(newData)
    })
  }, [])

  const onAdd = (manga) => {
    axios.post('http://localhost:3001/data', manga)
      .then(res => {
        const newManga = res.data
        setData(data.concat(newManga))
      })
  }

  const handleFilterChange = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return (
    <>
    <div>
      <table width='60%'>
        <tbody>
        <tr>
          <th><h3>Title</h3></th>
          <th><h3>Last Read</h3></th>
          <th>Previous Button</th>
          <th><h3>Current</h3></th>
          <th>Next Button</th>
          <th>Link</th>
          <th>Open next 3</th>
          <th>Status</th>
        </tr>
        {data
          .filter(manga => manga.status.includes(filter))
          .map(manga =>
          <TableSingle manga={manga} key={manga.id} />
        )}
        </tbody>
      </table>
      <select value={filter} onChange={handleFilterChange}>
          <option value={''}>All</option>
          <option value={'reading'}>Reading</option>
          <option value={'finished'}>Finished</option>
          <option value={'to start'}>To start</option>
      </select>
    </div>
    <div>
      <br />
      <AddMangaForm add={onAdd}/>
    </div>
    </>
  )
}

export default MangaTable