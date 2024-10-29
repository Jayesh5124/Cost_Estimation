import React from 'react';
import { Box, Typography, TextField, Button, Grid, Radio, RadioGroup, FormControlLabel, Link } from '@mui/material';

const LoginForm: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '73vh',
        backgroundColor: '#f0f0f0', // Light gray background
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff', // White background for the login box
          borderRadius: '12px', // More rounded corners for a modern look
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow
          padding: '2.5rem',
          width: '100%',
          maxWidth: '400px', // Maximum width of the box
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
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ marginBottom: '1rem' }}
        />

        <RadioGroup defaultValue="user" sx={{ marginBottom: '1rem' }}>
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="constructor" control={<Radio />} label="Constructor" />
        </RadioGroup>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginBottom: '1rem',
            backgroundColor: '#1976d2', // Primary color
            '&:hover': {
              backgroundColor: '#155a8a', // Darker shade on hover
            },
          }}
        >
          Login
        </Button>

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
