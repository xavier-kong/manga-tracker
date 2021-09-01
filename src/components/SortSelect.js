import React from 'react'

const SortSelect = ({ setSorter, sorter }) => {
  const handleChange = (e) => {
    e.preventDefault()
    setSorter(e.target.value)  
  }

  return (
    <>
      <label>Sort by:</label>
      <select value={sorter} onChange={handleChange}>
        <option value='timedes'>Time descending</option>
        <option value='timeasc'>Time ascending</option>
        <option value='namedes'>Name descending</option>
        <option value='nameasc'>Name ascending</option>
      </select>
    </>
  )
}

export default SortSelect