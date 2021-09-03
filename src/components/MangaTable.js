import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableSingle from './TableSingle';
import AddMangaForm from './AddMangaForm';
import Notifications from './Notifications';
import StatsToggle from './StatsToggle';
import SortSelect from './SortSelect';
import configGen from '../services/configGen'
import sortingHandler from '../services/sortingHandler'
import { Table, Button } from 'react-bootstrap';

let denotifyTimeout = 0;

const style = {
  textAlign: 'center',
};

const MangaTable = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('reading');
  const [message, setMessage] = useState('');
  const [sorter, setSorter] = useState('timedes')
  const [statvis, setStatvis] = useState(false)
  const config = configGen()

  useEffect(() => {
    const config = configGen()
    axios.get('/api/manga', config).then((res) => {
      setData(res.data);
    });
  }, [filter, message]);

  const notificationHandler = (notif) => {
    clearTimeout(denotifyTimeout);
    denotifyTimeout = setTimeout(() => { setMessage(''); }, 2500);
    setMessage(notif);
  };

  const onAdd = (manga) => {
    axios.post('/api/manga', manga, config)
      .then((res) => {
        setData(res.data);
        notificationHandler(`Added new manga ${manga.title}`, setMessage);
      });
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
      <Table>
        <tbody>
        <tr style={style}>
          <th><h3>Title</h3></th>
          <th><h3>Last Read</h3></th>
          <th><h3>Current</h3></th>
          <th>Link</th>
          <th>Notes</th>
          <th>Status</th>
        </tr>
        {data
          .filter((manga) => manga.status.includes(filter))
          .sort((a,b) => (sortingHandler(sorter, a, b))) 
          .map((manga) => <TableSingle
            manga={manga}
            key={manga._id}
            alert={(mssg) => notificationHandler(mssg)}
            />)
          }
        </tbody>
      </Table>
    </div>
    <div>
      <AddMangaForm add={onAdd}/><Notifications message={message} />
      <Button onClick={() => setStatvis(!statvis)}>
        {statvis ? 'Hide Stats' : 'Show Stats'}
      </Button>
      <StatsToggle data={data} vis={statvis}/>
      <SortSelect setSorter={setSorter} sorter={sorter} />
    </div>
    </>
  );
};

export default MangaTable;
