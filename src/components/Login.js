import React from 'react'
import useField from '../hooks/useField'
const axios = require('axios')

const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
      username: username.value,
      password: password.value
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(response)
      )
    } catch (e) {
      console.log(e)
    }
  }

  //change later 

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        username: 
        <input {...username} />
        <br />
        password: 
        <input {...password} />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
