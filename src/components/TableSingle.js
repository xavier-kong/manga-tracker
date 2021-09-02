import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useField from '../hooks/useField';
import configGen from '../services/configGen';
import dateHandler from '../services/dateHandler';

const style = {
  textAlign: 'center',
};

const TableSingle = (data) => {
  const [manga, setManga] = useState('');
  const [visible, setVisible] = useState(false);
  const [notevis, setNotevis] = useState(false);
  const link = useField('text');
  const notes = useField('text');
  const baseUrl = 'http://localhost:3001/api/manga';

  useEffect(() => {
    if (!manga) {
      setManga(data.manga);
    } else {
      setManga(manga);
    }
  }, [data, manga]);

  const config = configGen()

  const buttonHandler = (e) => {
    e.preventDefault();
    if (e.target.outerText === '<') {
      const newManga = { ...manga, chapter: manga.chapter -= 1 };
      setManga(newManga);
      axios.put(baseUrl, newManga, config)
        .then((res) => {
          setManga(res.data);
          data.alert(`${res.data.title} moved to previous chapter`);
        })
        .catch((error) => {
          data.alert(`Error: ${error}`);
        });
    } else if (e.target.outerText === '>') {
      const newManga = { ...manga, chapter: manga.chapter += 1, lastRead: new Date() };
      setManga(newManga);
      axios.put(baseUrl, newManga, config)
        .then((res) => {
          setManga(res.data);
          data.alert(`${res.data.title} moved to next chapter`);
        })
        .catch((error) => {
          data.alert(`Error: ${error}`);
        });
    }
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to mark ${manga.title} as ${e.target.value}`)) {
      const newManga = { ...manga, status: e.target.value };
      axios.put(baseUrl, newManga, config)
        .then((res) => {
          setManga(res.data);
          data.alert(`Setting ${manga.title} status to ${e.target.value}`);
        })
        .catch((error) => {
          data.alert(`Error: ${error}`);
        });
    }
  };

  const visibility = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const noteVisibility = (e) => {
    e.preventDefault()
    setNotevis(!notevis)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newManga = { ...manga, link: link.value };
    axios.put(baseUrl, newManga, config)
      .then((res) => {
        setManga(res.data);
        link.onSubmit();
        setVisible(!visible);
      })
      .catch((error) => {
        data.alert(`Error: ${error}`);
      });
  };

  const noteUpdate = (e) => {
    e.preventDefault();
    const newManga = { ...manga, notes: notes.value };
    axios.put(baseUrl, newManga, config)
      .then((res) => {
        setManga(res.data);
        notes.onSubmit();
        setNotevis(!notevis);
      })
      .catch((error) => {
        data.alert(`Error: ${error}`);
      });
  }

  return (
      <tr style={style}>
        <td>{manga.title || 'none'}</td>
        <td>{dateHandler(manga.lastRead)}</td>
        <td>
          <button onClick={buttonHandler}>{'<'}</button>
          &nbsp;{manga.chapter}&nbsp;
          <button onClick={buttonHandler}>{'>'}</button>
        </td>
        <td>
          {!visible
            ? <>
           <a href={String(manga.link)}>Go</a>
           <button onClick={visibility}>Update</button>
          </>
            : <>
            <form onSubmit={handleSubmit}>
              link: <input {...link} />
              <button type='submit'>Update</button>
              <button onClick={visibility}>Cancel</button>
            </form>
          </>
          }
        </td>
        <td>
          {!notevis
          ? <>
          <p>{manga.notes}<button onClick={noteVisibility}>Update</button></p>
          </>
            : <>
            <form onSubmit={noteUpdate}>
              <input
                type={notes.type}
                onChange={notes.onChange}
                onSubmit={notes.onSubmit}
                defaultValue={manga.notes}
              /> 
              <button type='submit'>Update</button>
              <button onClick={noteVisibility}>Cancel</button>
            </form>
            </>
          }
        </td>
        <td>
          <select onChange={handleFilterChange}>
            {<option value={manga.status}>{manga.status}</option>}
            {manga.status === 'reading' ? null : <option value={'reading'}>reading</option>}
            {manga.status === 'finished' ? null : <option value={'finished'}>finished</option>}
            {manga.status === 'to start' ? null : <option value={'to start'}>to start</option>}
            {manga.status === 'on hold' ? null : <option value={'on hold'}>on hold</option>}
          </select>
        </td>
        <td>
        </td>
      </tr>
  );
};

export default TableSingle;
