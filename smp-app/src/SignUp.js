import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './Login.css'; // Reusing the login CSS for similar styling

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !username || !password || !confirmPassword) {
      setError('All fields are required!');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match!');
    } else {
      setError('');
      const newUser = {
        email,         // Email is stored too
        username,      // This is our primary identifier now
        password,      // Store the password if needed (or hash it in a real app)
        profileImage: 'https://via.placeholder.com/150',
        bio: 'New user',
        posts: [],
      };
      onSignUp(newUser);
    }
  };

  return (
    <div className="login-container">
      <Container maxWidth="xs" className="login-box">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
          <h1 className="header-title">Connect</h1>
          <p className="words">Create a new account</p>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
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
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              sx={{ mb: 2 }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
              Sign Up
            </Button>
            <Typography variant="body2" align="center">
              Already have an account? <Link to="/Login">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
