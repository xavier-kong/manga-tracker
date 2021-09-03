import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useField from '../hooks/useField';
import configGen from '../services/configGen';
import dateHandler from '../services/dateHandler';
import { Button } from 'react-bootstrap';

const style = {
  textAlign: 'center',
};

const TableSingle = (data) => {
  const [manga, setManga] = useState('');
  const [visible, setVisible] = useState(false);
  const [notevis, setNotevis] = useState(false);
  const link = useField('text');
  const notes = useField('text');
  const baseUrl = '/api/manga';

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
        data.alert(`Changed link for ${manga.title}`)
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
        data.alert(`Updated notes for ${manga.title}`)
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
          <Button onClick={buttonHandler}>{'<'}</Button>
          &nbsp;{manga.chapter}&nbsp;
          <Button onClick={buttonHandler}>{'>'}</Button>
        </td>
        <td>
          {!visible
            ? <>
           <a href={String(manga.link)}>Go</a>
           <Button onClick={visibility}>Update</Button>
          </>
            : <>
            <form onSubmit={handleSubmit}>
              link: <input {...link} />
              <Button type='submit'>Update</Button>
              <Button onClick={visibility}>Cancel</Button>
            </form>
          </>
          }
        </td>
        <td>
          {!notevis
          ? <>
          <p>{manga.notes}<Button onClick={noteVisibility}>Update</Button></p>
          </>
            : <>
            <form onSubmit={noteUpdate}>
              <input
                type={notes.type}
                onChange={notes.onChange}
                onSubmit={notes.onSubmit}
                defaultValue={manga.notes}
              />
              <Button type='submit'>Update</Button>
              <Button onClick={noteVisibility}>Cancel</Button>
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
      </tr>
  );
};

export default TableSingle;
