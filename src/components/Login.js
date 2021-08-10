import React from 'react'
import useField from '../hooks/useField'

const Login = ({ onLogin }) => {
  const username = useField('text')
  const password = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("logged in user", username.value, password.value )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        username: 
        <input {...username} />
        <br />
        password: 
        <input {...password} />
        <br />
      </form>
    </div>
  )
}

export default Login
