import React, { useState, useEffect } from 'react'
import MangaTable from './components/MangaTable'
import Login from './components/Login'

const App = () => {
  const [ user, setUser ] = useState('')

  useEffect(() => {
    const userJSON = localStorage.getItem('loggedInUser')
    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }, []) //implement token based later

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser('')
  }

  return (
  <>
    {!user  ? <Login /> :
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
