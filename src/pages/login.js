import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8000/login', { username, password });
      console.log(res.data);
      navigate('/plotter');
    } catch (error) {
      console.error(error.response.data); 
    }
  };

  return (
    <>
      <CssBaseline></CssBaseline>
      <Container>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Link to="/signup"><Typography variant='h6'>Don't have an account? Signup Now!</Typography></Link>
        </Container>
      </>
  );
};

export default LoginPage;
