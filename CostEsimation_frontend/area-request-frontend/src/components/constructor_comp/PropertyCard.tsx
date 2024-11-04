import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Icon, TextField, Pagination } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Property {
  user_email: string;
  user_name: string;
  city: string;
  state: string;
  builtup_area: number;
  property_name?: string;
}

interface PropertyListingProps {
  properties: Property[];
  onEstimate: (id: string) => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({ properties, onEstimate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;
  const navigate = useNavigate();

  const filteredProperties = properties.filter((property) => {
    const builtUpAreaMatch = property.builtup_area.toString().includes(searchTerm);
    const nameMatch = property.property_name?.toLowerCase().includes(searchTerm.toLowerCase() || '');
    return nameMatch || builtUpAreaMatch;
  });

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page <= totalPages ? page : totalPages);
  };

  const getCityType = (city: string): number => {
    const tier1Cities = [
      'mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata',
      'hyderabad', 'pune', 'ahmedabad', 'bengaluru', 'new delhi',
      'surat', 'lucknow', 'jaipur', 'kanpur', 'nagpur',
      'indore', 'thane', 'bhopal', 'visakhapatnam', 'pimpri-chinchwad',
      'patna', 'vadodara', 'ghaziabad', 'ludhiana', 'coimbatore',
      'agra', 'madurai', 'nashik', 'faridabad', 'meerut',
      'rajkot', 'varanasi', 'srinagar', 'aurangabad', 'dhanbad',
      'amritsar', 'navi mumbai', 'allahabad', 'ranchi', 'howrah',
      'jabalpur', 'gwalior', 'vijayawada', 'jodhpur', 'raipur',
      'kota', 'guwahati', 'chandigarh', 'thiruvananthapuram', 'solapur',
      'hubli-dharwad', 'mysore', 'tiruchirappalli', 'bareilly', 'aligarh',
      'tiruppur', 'gurgaon', 'moradabad', 'jalandhar', 'bhubaneswar',
      'salem', 'warangal', 'guntur', 'bhiwandi', 'saharanpur'
    ];
    return tier1Cities.includes(city.toLowerCase()) ? 2 : 1;
  };

  const handleEstimate = async (property: Property) => {
    try {
      const type = getCityType(property.city);
      const response = await axios.post(`http://localhost:3005/api/cost-estimates/calculate/${property.builtup_area}/${type}`, {
        builtup_area: property.builtup_area,
        type: type,
      });
      console.log(property.builtup_area);
      
      navigate('/cost_estimation', {
        state: {
          email: property.user_email,
          user_email: property.user_email,
          estimationResult: response.data,
          total_cost: response.data,
          builtup_area: property.builtup_area,
        },
      });
 
      onEstimate(property.user_email);
    } catch (error) {
      console.error('Error calculating estimation:', error);
    }
  };

  const handleViewDetails = (email: string) => {
    navigate(`/area-request-details/${email}`, {
      state: { email },
    });
  };

  return (
    <Box sx={{ padding: 2, background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        <TextField
          label="Search by Name or Built-Up Area"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '300px',
            mr: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
              '& fieldset': { borderColor: '#1976d2' },
              '&:hover fieldset': { borderColor: '#0d47a1' },
              '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
            },
            '& .MuiInputLabel-outlined': {
              color: '#1976d2',
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, ml: 10 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>

      {paginatedProperties.map((property) => (
        <Card
          key={property.user_email}
          sx={{
            display: 'flex',
            mb: 3,
            p: 3,
            alignItems: 'center',
            borderRadius: 3,
            background: 'linear-gradient(to right,#919191, #f1f1f1)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': { transform: 'scale(1.03)', boxShadow: '0 12px 28px rgba(0, 0, 0, 0.2)' },
          }}
        >
          <Box sx={{ display: 'flex', width: '30%', alignItems: 'center' }}>
            <Icon sx={{ fontSize: 60, color: 'black', marginRight: 2 }}>
              <HomeWorkIcon fontSize="inherit" />
            </Icon>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#181a1a' }}>{property.property_name || 'N/A'}</Typography>
              <Typography variant="body2" sx={{ color: '#45591c' }}>{property.state}</Typography>
              <Typography variant="body2" sx={{ color: '#45591c' }}>{property.city}</Typography>
              <Typography variant="body2" sx={{ color: '#4e342e', mt: 1 }}>Built-up Area: {property.builtup_area}</Typography>
              <Typography variant="body2" sx={{ color: '#4e342e' }}>Owner: {property.user_name}</Typography>
            </Box>
          </Box>

          <CardContent sx={{ flexGrow: 1, ml: 3, borderLeft: '1px solid #b0bec5', pl: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#181a1a' }}>Property Details</Typography>
            <Typography variant="body2" sx={{ color: '#37474f', mb: 1 }}>
              Explore detailed information about the property.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                color: '#0288d1',
                borderColor: '#0288d1',
                '&:hover': {
                  backgroundColor: '#0288d1',
                  color: '#fff',
                  boxShadow: '0 4px 10px rgba(2, 136, 209, 0.3)',
                },
              }}
              onClick={() => handleViewDetails(property.user_email)}
            >
              View Details
            </Button>
          </CardContent>

          <Box sx={{ textAlign: 'right', minWidth: '150px' }}>
            <Button
              variant="contained"
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: '8px',
                backgroundColor: 'black',
                boxShadow: '0px 6px 16px rgba(255, 112, 67, 0.4)',
                '&:hover': {
                  backgroundColor: 'gray',
                  boxShadow: '0px 8px 20px rgba(230, 74, 25, 0.6)',
                },
              }}
              onClick={() => handleEstimate(property)}
            >
              Estimate
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default PropertyListing;
