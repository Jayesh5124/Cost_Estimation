
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import { Link, LinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';

// Create a styled NavButton that accepts LinkProps and ButtonProps
const NavButton = styled(Button)<ButtonProps & LinkProps>(({ theme }) => ({
  color: '#fff',
  marginLeft: theme.spacing(2),
  transition: 'background-color 0.3s, transform 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light hover effect
    transform: 'scale(1.05)', // Slight scale on hover
  },
}));

const Navbar: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      style={{ 
        backgroundColor: 'black', 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Add shadow for depth
        padding: '0.5rem 1rem', // Padding for top/bottom
      }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Construction Cost Estimator
          </Link>
        </Typography>
        
        <NavButton component={Link} to="/">
          <HomeIcon style={{ marginRight: '0.5rem' }} /> Home
        </NavButton>
        <NavButton component={Link} to="/about">
          <InfoIcon style={{ marginRight: '0.5rem' }} /> About
        </NavButton>
        <NavButton component={Link} to="/services">
          <BuildIcon style={{ marginRight: '0.5rem' }} /> Services
        </NavButton>
        <NavButton component={Link} to="/contact">
          <ContactMailIcon style={{ marginRight: '0.5rem' }} /> Contact
        </NavButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;