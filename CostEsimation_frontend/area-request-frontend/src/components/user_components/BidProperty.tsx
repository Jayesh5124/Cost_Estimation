import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Icon,
} from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

interface Property {
  id: number;
  name: string;
  state: string;
  city: string;
  builtUpArea: string;
  constructorName: string;
  imageUrl: string; // Image URL for the city or property
}

interface PropertyBidProps {
  property: Property;
  onViewDetails: (id: number) => void;
  onStartBuilding: (id: number) => void;
}

const PropertyBid: React.FC<PropertyBidProps> = ({ property, onViewDetails, onStartBuilding }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        mb: 3,
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box sx={{ display: 'flex', p: 2, width: '60%', alignItems: 'center' }}>
        <Icon sx={{ fontSize: 60, color: 'black', marginRight: 2 }}>
          <HomeWorkIcon fontSize="inherit" />
        </Icon>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            {property.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            {property.state}
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            {property.city}
          </Typography>
          <Typography variant="body2" sx={{ color: '#4e342e', mt: 1 }}>
            Built-up Area: {property.builtUpArea}
          </Typography>
          <Typography variant="body2" sx={{ color: '#4e342e' }}>
            Constructor: {property.constructorName}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#181a1a' }}>
          Property Details
        </Typography>
        <Typography variant="body2" sx={{ color: '#37474f', mb: 1 }}>
          Explore detailed information about the property.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => onViewDetails(property.id)}
          sx={{
            color: '#0288d1',
            borderColor: '#0288d1',
            '&:hover': {
              backgroundColor: '#0288d1',
              color: '#fff',
            },
          }}
        >
          View Details
        </Button>
      </CardContent>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button
          variant="contained"
          onClick={() => onStartBuilding(property.id)}
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Start Building
        </Button>
      </Box>
    </Card>
  );
};

export default PropertyBid;
