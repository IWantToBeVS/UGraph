import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    if (password === confirmPassword){
        try {
            const res = await axios.post('http://localhost:8000/signup', { username, email, password });
            console.log(res.data);
        } catch (error) {
            console.error(error.response.data);
        }
    }
    else {
        alert('Confirm password not same as password');
    }
  };

  return (
    <div>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default SignupPage;
