import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';  // Import Link here
import './Login.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Both fields are required!');
    } else {
      setError('');
      onLogin(email, password);
    }
  };

  return (
    <div className="login-container">
      <Container maxWidth="xs" className="login-box">
        <Box sx={{ display: 'flex', flexDirection: 'column',alignItems: 'center', marginTop: 3 }}>
          <h1 className="header-title">Connect</h1>
          <p className="words">Login to continue</p>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            {error && <Typography color="error" variant="body2" sx={{ mb: 2 }}>{error}</Typography>}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
              Login
            </Button>
            <Typography variant="body2" align="center">
              Don't have an account? <Link to="/SignUp">Sign Up</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
