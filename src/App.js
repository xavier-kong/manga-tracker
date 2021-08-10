import React, { useState } from 'react'
import MangaTable from './components/MangaTable'
import Login from './components/Login'
import { Switch, Route, Redirect } from 'react-router-dom' 

const App = () => {
  const [ user, setUser ] = useState(false)

  const login = () => {
    setUser(true)
  }
  return (
    <Switch>
      <Route path="/">
        {user ? 
        <div>
          <h1>Manga Tracker</h1>
          <p>place holder for nav bar</p>
          <MangaTable />
        </div> 
        : <Redirect to='/login' />}
      </Route>
      <Route path='/login'>
          <Login onLogin={login} />
      </Route>
    </Switch>
    
  );
}

export default App;
