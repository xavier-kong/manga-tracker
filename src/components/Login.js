import React from 'react';
import useField from '../hooks/useField';
import { Form, Button } from 'react-bootstrap'

const axios = require('axios');

const Login = ({ onLogin }) => {
  const username = useField('text');
  const password = useField('password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        username: username.value,
        password: password.value,
      });
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(response.data),
      );
      onLogin();
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control {...username} /><br />
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} /><br />
          <Button type='submit'>Login</Button>
        </Form.Group>               
      </Form>
    </div>
  );
};

export default Login;
