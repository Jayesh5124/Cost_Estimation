import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, LinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Create a styled NavButton that accepts LinkProps and ButtonProps
const NavButton = styled(Button)<{ component?: React.ElementType } & LinkProps>(({ theme }) => ({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lighten on hover
  },
}));

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#4A90E2' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontSize: '1.5rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Construction Cost Estimator
          </Link>
        </Typography>
        <NavButton component={Link} to="/">
          Home
        </NavButton>
        <NavButton component={Link} to="/about">
          About
        </NavButton>
        <NavButton component={Link} to="/services">
          Services
        </NavButton>
        <NavButton component={Link} to="/contact">
          Contact
        </NavButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
