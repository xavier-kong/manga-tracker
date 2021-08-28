import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MangaTable from './components/MangaTable';
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState('loading...');

  useEffect(() => {
    const userJSON = localStorage.getItem('loggedInUser');
    const config = {
      headers: { Authorization: `bearer ${(JSON.parse(userJSON)).token}` },
    };
    axios
      .get('http://localhost:3001/api/users/verify', config)
      .then((res) => {
        if (res.data === 'valid') {
          setUser(JSON.parse(userJSON));
        } else {
          setUser(null);
        }
        // res.data === 'valid' ? setUser(JSON.parse(userJSON)) : setUser(null);
      })
      .catch((e) => {
        setUser(null);
      });
  }, []);

  const login = () => {
    const userJSON = localStorage.getItem('loggedInUser');
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
  <>
    {!user ? <Login onLogin={login}/> : user === 'loading...' ? <p>{user}</p>
      : <div>
      <h1>Manga Tracker</h1>
      <p>Logged in as 'user name' <button onClick={() => (logout())}>logout</button></p>
      <MangaTable />
    </div>
    }
  </>
  );
};

export default App;
