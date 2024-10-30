
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// Define a type for the location state to get userId
interface LocationState {
  userId: number;
}

const PropertyDetailsForm: React.FC = () => {
  // Use useLocation without generics
  const location = useLocation(); // Just use useLocation
  const userEmail = (location.state as { user_email: string })?.user_email; 
  const userName = (location.state as { user_name: string })?.user_name; // Cast location.state to LocationState
 
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [isConstruction, setIsConstruction] = useState(false);
  const [isInteriorDesign, setIsInteriorDesign] = useState(false);
 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const areaRequest = {
      user_email: userEmail,/// Use userId from state
      user_name: userName,
      city:city,
      state: stateName,
      builtup_area: Number(builtUpArea),
      property_name: 'Some Property Name', // Placeholder; consider adding a field for this
    };

    console.log(areaRequest);
    console.log('User email:',userEmail);
    console.log('User Name:',userName);
    
    // Make an API call to save the areaRequest
    try {
      await axios.post('http://localhost:3003/api/area-requests', areaRequest);
      alert('Property details submitted successfully!');
    } catch (error) {
      console.error('Error submitting property details:', error);
      alert('Failed to submit property details. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f7f9fc',
        minHeight: '73vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold" color="#333">
          Enter Property Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* City Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Enter City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* State Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Enter State"
                variant="outlined"
                fullWidth
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* Built-Up Area Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Built-Up Area (sq ft)"
                variant="outlined"
                fullWidth
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* Checkboxes for Construction and Interior Design */}
            {/* <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 1 }} color="#555">
                Select Services:
              </Typography>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isConstruction}
                      onChange={(e) => setIsConstruction(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Construction"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isInteriorDesign}
                      onChange={(e) => setIsInteriorDesign(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Interior Design"
                />
              </FormControl>
            </Grid> */}

            {/* Post Property Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  '&:hover': {
                    backgroundColor: '#1976d2',
                  },
                  padding: '1rem',
                  fontWeight: 'bold',
                }}
              >
                Post Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default PropertyDetailsForm;
