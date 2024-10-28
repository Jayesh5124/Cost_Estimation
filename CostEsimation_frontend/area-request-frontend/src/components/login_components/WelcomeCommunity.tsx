import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import communityImage from '../images/community_image.jpg'; // Update the path to your image

const WelcomeCommunity: React.FC = () => {
  return (
    <Box
      sx={{
        padding: '0',
        paddingLeft:'20px',
        paddingRight:'20px',

        display: 'flex',
        alignItems: 'center',
        height: '86vh',
        backgroundColor: 'gray', // Light gray background color
        overflow: 'hidden', // Prevent scrolling
         
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
          <Typography variant="h2" gutterBottom>
            Welcome to Our Community
          </Typography>
          <Typography variant="h5" gutterBottom>
            Sign up to connect with others and explore exciting features!
          </Typography>
          <Link to="/registration" style={{ textDecoration: 'none' }}>
  <Button variant="contained" color="primary">
    Sign Up
  </Button>
</Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={communityImage} alt="Community" style={{ width: '100%', height: 'auto' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeCommunity;
