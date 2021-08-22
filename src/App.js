import React, { useState, useEffect } from 'react'
import MangaTable from './components/MangaTable'
import Login from './components/Login'
import axios from 'axios'

const App = () => {
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const userJSON = localStorage.getItem('loggedInUser')
    try {
      const user = JSON.parse(localStorage.getItem('loggedInUser'))
      const token = `bearer ${user.token}`
      const config = {
      headers: { Authorization: token }
      }
      axios.get('http://localhost:3001/api/user/verify', config)
      setUser(JSON.parse(userJSON))
    } catch (e) {
      console.log(e)
      setUser(null)
    }
  }, []) //implement token based later

  const login = () => {
    const userJSON = localStorage.getItem('loggedInUser')
    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null)
  }

  return (
  <>
    {!user  ? <Login onLogin={login}/> :
    <div>
      <h1>Manga Tracker</h1>
      <p>Logged in as 'user name' <button onClick={() => (logout())}>logout</button></p>
      <MangaTable />
    </div>
    }
  </>
  );
}

export default App;
