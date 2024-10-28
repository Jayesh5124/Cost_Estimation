import React from 'react';
import { Box, Typography, TextField, Button, Grid, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const RegistrationPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0', // Light gray background color
        padding: '2rem', // Add some padding
      }}
    >
      <Box
        sx={{
          backgroundColor: 'darkgray', // White background for the registration box
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          padding: '2rem',
          width: '100%', // Full width within the padding
          maxWidth: '800px', // Maximum width of the box
        }}
      >
        <Grid container spacing={2}>
          {/* Left Side: Registration Form */}
          <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
            <Typography variant="h4" gutterBottom>
              Create Account
            </Typography>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: '1rem' }}
            />

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

            <Button variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>

          {/* Right Side: User Type Selection */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Select User Type
            </Typography>
            <RadioGroup defaultValue="user">
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="constructor" control={<Radio />} label="Constructor" />
            </RadioGroup>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
