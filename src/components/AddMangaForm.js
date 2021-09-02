import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useField from '../hooks/useField';

const AddMangaForm = ({ add }) => {
  const [visible, setVisible] = useState(false);
  const title = useField('text');
  const link = useField('text');

  const ShowButton = () => {
    const showHandler = (event) => {
      event.preventDefault();
      setVisible(!visible);
    };
    return (
      <Button
        onClick={showHandler}>
        {/* style={{ height: '25px', width: '90px' }}> */}
          {visible ? 'Close' : 'Add Manga'}
      </Button>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add({
      title: title.value,
      link: link.value,
    });
    title.onSubmit();
    link.onSubmit();
    setVisible(!visible);
  };

  return (
    <div>
      <ShowButton />
      {!visible
        ? null
        : 
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control {...title} /><br />
          <Form.Label>link:</Form.Label>
          <Form.Control {...link} /><br />
          <Button type='submit'>Add</Button>
        </Form.Group>
      </Form>
      }
    </div>
  );
};

export default AddMangaForm;
