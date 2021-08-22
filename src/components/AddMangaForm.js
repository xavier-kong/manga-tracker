import React, { useState } from 'react'
import useField from '../hooks/useField'

const AddMangaForm = ({ add }) => {
  const [ visible, setVisible ] = useState(false)
  const title = useField('text')
  const link = useField('text')

  const ShowButton = () => {
    const showHandler = (event) => {
      event.preventDefault()
      setVisible(!visible)
    }
    return (
      <button 
        onClick={showHandler} 
        style={{height: '25px', width : '90px'}}>
          {visible ? 'Close' : 'Add Manga'}
      </button>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    add({
      title: title.value,
      link: link.value
    })
    setVisible(!visible)
  }
  
  return (
    <div>
      <ShowButton />
      {!visible ? 
      null:
      <form onSubmit={handleSubmit}>
        title: 
        <input {...title} />
        <br />
        link: 
        <input {...link} />
        <button type='submit'>Add</button>
      </form>
      }
    </div>
  )
}

export default AddMangaForm
