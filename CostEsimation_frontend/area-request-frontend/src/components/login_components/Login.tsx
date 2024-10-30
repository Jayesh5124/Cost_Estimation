// import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, Link } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

// Define the User interface
interface User {
  email: string;
  password: string;
  userType: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default user type
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const endpoint = userType === 'user'
        ? 'http://localhost:3001/api/users/login'
        : 'http://localhost:3002/api/constructors/login';

      const response = await axios.post(endpoint, {
        email,
        password
      });

      console.log(response.data);

      if (response.data) {
        alert(`Login successful! Welcome ${userType}`);
        // Here you might want to:
        // - Store the token in localStorage
        // - Redirect to appropriate dashboard
        // - Update global auth state
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '73vh',
        backgroundColor: '#f0f0f0',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: '1rem' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <RadioGroup
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          sx={{ marginBottom: '1rem' }}
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="constructor" control={<Radio />} label="Constructor" />
        </RadioGroup>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{
            marginBottom: '1rem',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#155a8a',
            },
          }}
        >
          Login
        </Button>

        {error && (
          <Typography color="error" variant="body2" textAlign="center" sx={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}

        <Typography variant="body2" textAlign="center">
          <Link href="#" underline="hover" sx={{ color: '#4A90E2', '&:hover': { textDecoration: 'underline' } }}>
            Forgot Password?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
