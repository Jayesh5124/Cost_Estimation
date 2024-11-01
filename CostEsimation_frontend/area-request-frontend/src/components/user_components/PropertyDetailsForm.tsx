// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   FormControl,
//   FormControlLabel,
//   Checkbox,
// } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// // Define a type for the location state to get userId
// interface LocationState {
//   userId: number;
// }

// const PropertyDetailsForm: React.FC = () => {
//   // Use useLocation without generics
//   const location = useLocation(); // Just use useLocation
//   const userEmail = (location.state as { user_email: string })?.user_email; 
//   const userName = (location.state as { user_name: string })?.user_name; // Cast location.state to LocationState
 
//   const [city, setCity] = useState('');
//   const [stateName, setStateName] = useState('');
//   const [builtUpArea, setBuiltUpArea] = useState('');
//   const [isConstruction, setIsConstruction] = useState(false);
//   const [isInteriorDesign, setIsInteriorDesign] = useState(false);
//   const [propertyName, setPropertyName] = useState('');
 

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const areaRequest = {
//       user_email: userEmail,/// Use userId from state
//       user_name: userName,
//       city:city,
//       state: stateName,
//       builtup_area: Number(builtUpArea),
//       property_name: propertyName,
//     };

//     console.log(areaRequest);
//     console.log('User email:',userEmail);
//     console.log('User Name:',userName);
    
//     // Make an API call to save the areaRequest
//     try {
//       await axios.post('http://localhost:3003/api/area-requests', areaRequest);
//       alert('Property details submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting property details:', error);
//       alert('Failed to submit property details. Please try again.');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         backgroundColor: '#f7f9fc',
//         minHeight: '73vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           padding: 4,
//           backgroundColor: '#ffffff',
//           borderRadius: '12px',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
//           maxWidth: '600px',
//           width: '100%',
//         }}
//       >
//         <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold" color="#333">
//           Enter Property Details
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {/* Property Name Input */}
//             <Grid item xs={12}>
//               <TextField
//                 label="Property Name"
//                 variant="outlined"
//                 fullWidth
//                 value={propertyName}
//                 onChange={(e) => setPropertyName(e.target.value)}
//                 required
//                 sx={{ marginBottom: 2 }}
//               />
//             </Grid>

//             {/* City Input */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Enter City"
//                 variant="outlined"
//                 fullWidth
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 required
//                 sx={{ marginBottom: 2 }}
//               />
//             </Grid>

//             {/* State Input */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Enter State"
//                 variant="outlined"
//                 fullWidth
//                 value={stateName}
//                 onChange={(e) => setStateName(e.target.value)}
//                 required
//                 sx={{ marginBottom: 2 }}
//               />
//             </Grid>

//             {/* Built-Up Area Input */}
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Built-Up Area (sq ft)"
//                 variant="outlined"
//                 fullWidth
//                 value={builtUpArea}
//                 onChange={(e) => setBuiltUpArea(e.target.value)}
//                 required
//                 sx={{ marginBottom: 2 }}
//               />
//             </Grid>
//             {/* Post Property Button */}
//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 fullWidth
//                 sx={{
//                   '&:hover': {
//                     backgroundColor: '#1976d2',
//                   },
//                   padding: '1rem',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Post Property
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default PropertyDetailsForm;
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PropertyDetailsForm: React.FC = () => {
  const location = useLocation();
  const userEmail = (location.state as { user_email: string })?.user_email; 
  const userName = (location.state as { user_name: string })?.user_name;

  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState<string>(''); 
  const [flatsPerFloor, setFlatsPerFloor] = useState<number | ''>(''); 
  const [cabinsNeeded, setCabinsNeeded] = useState<number | ''>(''); 
  const [landClearanceNeeded, setLandClearanceNeeded] = useState<string>('No'); 
  const [landClearance, setLandClearance] = useState<number | ''>(''); 
  const [floorsNeeded, setFloorsNeeded] = useState<number | ''>(''); // New state for floors needed

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const areaRequest = {
      user_email: userEmail,
      user_name: userName,
      city: city,
      state: stateName,
      builtup_area: Number(builtUpArea),
      property_name: propertyName,
      property_type: propertyType,
      flats_per_floor: propertyType === 'Residential' ? Number(flatsPerFloor) : undefined,
      cabins_needed: propertyType === 'Commercial' ? Number(cabinsNeeded) : undefined,
      land_clearance_needed: landClearanceNeeded === 'Yes',
      land_clearance: landClearanceNeeded === 'Yes' ? Number(landClearance) : undefined,
      floors_needed: Number(floorsNeeded) // Include floors needed in the request
    };

    console.log(areaRequest);

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
            {/* Property Name Input */}
            <Grid item xs={12}>
              <TextField
                label="Property Name"
                variant="outlined"
                fullWidth
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

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

            {/* Property Type Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  label="Property Type"
                >
                  <MenuItem value="Residential">Residential Construction</MenuItem>
                  <MenuItem value="Commercial">Commercial Construction</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Floors Needed Input */}
            <Grid item xs={12}>
              <TextField
                label="Number of Floors Needed"
                variant="outlined"
                fullWidth
                type="number"
                value={floorsNeeded}
                onChange={(e) => setFloorsNeeded(Number(e.target.value))}
                required
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* Conditional Inputs for Residential Construction */}
            {propertyType === 'Residential' && (
              <Grid item xs={12}>
                <TextField
                  label="Flats per Floor"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={flatsPerFloor}
                  onChange={(e) => setFlatsPerFloor(Number(e.target.value))}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            )}

            {/* Conditional Inputs for Commercial Construction */}
            {propertyType === 'Commercial' && (
              <Grid item xs={12}>
                <TextField
                  label="Cabins Needed"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={cabinsNeeded}
                  onChange={(e) => setCabinsNeeded(Number(e.target.value))}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            )}

            {/* Land Clearance Needed Input */}
            <Grid item xs={12}>
              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel>Is Land Clearance Needed?</InputLabel>
                <Select
                  value={landClearanceNeeded}
                  onChange={(e) => setLandClearanceNeeded(e.target.value)}
                  label="Is Land Clearance Needed?"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Land Clearance Amount Input */}
            {landClearanceNeeded === 'Yes' && (
              <Grid item xs={12}>
                <TextField
                  label="Land Clearance Needed (sq ft)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={landClearance}
                  onChange={(e) => setLandClearance(Number(e.target.value))}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            )}

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
