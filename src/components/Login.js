import React from 'react'
import useField from '../hooks/useField'

const Login = ({ onLogin }) => {
  const username = useField('text')
  const password = useField('password')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("logged in user", username.value, password.value )
    onLogin()
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
