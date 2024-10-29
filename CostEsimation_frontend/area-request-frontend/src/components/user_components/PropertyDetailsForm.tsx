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

const PropertyDetailsForm: React.FC = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [isConstruction, setIsConstruction] = useState(false);
  const [isInteriorDesign, setIsInteriorDesign] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
    console.log({
      city,
      state,
      builtUpArea,
      isConstruction,
      isInteriorDesign,
    });
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f7f9fc', // Light background color for the entire page
        minHeight: '73vh', // Full height for the background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#ffffff', // White background for the form
          borderRadius: '12px', // Rounded corners
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Enhanced shadow for depth
          maxWidth: '600px', // Limit the width of the form
          width: '100%', // Responsive width
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
                sx={{ marginBottom: 2 }} // Spacing below the input
              />
            </Grid>

            {/* State Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Enter State"
                variant="outlined"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                sx={{ marginBottom: 2 }} // Spacing below the input
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
                sx={{ marginBottom: 2 }} // Spacing below the input
              />
            </Grid>

            {/* Checkboxes for Construction and Interior Design */}
            <Grid item xs={12}>
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
            </Grid>

            {/* Post Property Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  '&:hover': {
                    backgroundColor: '#1976d2', // Darker shade on hover
                  },
                  padding: '1rem', // Increased padding for better clickability
                  fontWeight: 'bold', // Bold text for the button
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
