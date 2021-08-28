import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableSingle from './TableSingle';
import AddMangaForm from './AddMangaForm';
import Notifications from './Notifications';
import StatsToggle from './StatsToggle';

let denotifyTimeout = 0;

const MangaTable = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('reading');
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const token = `bearer ${user.token}`;
  const config = {
    headers: { Authorization: token },
  }; // refactor to services

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const token = `bearer ${user.token}`;
    const config = {
      headers: { Authorization: token },
    };
    axios.get('http://localhost:3001/api/manga', config).then((res) => {
      setData(res.data);
    });
  }, [filter, message]);

  const onAdd = (manga) => {
    axios.post('http://localhost:3001/api/manga', manga, config)
      .then((res) => {
        setData(res.data);
        notificationHandler(`Added new manga ${manga.title}`, setMessage);
      });
  };

  const notificationHandler = (message) => {
    clearTimeout(denotifyTimeout);
    denotifyTimeout = setTimeout(() => { setMessage(''); }, 2500);
    setMessage(message);
  };

  return (
    <>
    <div>
      <div>
        <button onClick={() => (setFilter('reading'))}>Reading</button>
        <button onClick={() => (setFilter('to start'))}>To start</button>
        <button onClick={() => (setFilter('finished'))}>Finished</button>
        <button onClick={() => (setFilter('on hold'))}>On hold</button>
        <button onClick={() => (setFilter(''))}>All</button>
        &nbsp; currently viewing: &nbsp; {filter || 'All'}
      </div>
      <table width='80%'>
        <tbody>
        <tr>
          <th><h3>Title</h3></th>
          <th><h3>Last Read</h3></th>
          <th><h3>Current</h3></th>
          <th>Link</th>
          <th>Status</th>
        </tr>
        {data
          .filter((manga) => manga.status.includes(filter))
          .map((manga) => <TableSingle manga={manga} key={manga._id} alert={(message) => notificationHandler(message)}/>)}
        </tbody>
      </table>
    </div>
    <div>
      <br />
      <AddMangaForm add={onAdd}/><Notifications message={message}/>
      <StatsToggle data={data}/>
    </div>
    </>
  );
};

export default MangaTable;
