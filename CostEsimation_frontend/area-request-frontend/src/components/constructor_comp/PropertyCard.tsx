import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Icon, TextField, Pagination, Tooltip, Badge, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageIcon from '@mui/icons-material/Message';

interface Property {
  user_email: string;
  user_name: string;
  city: string;
  state: string;
  builtup_area: number;
  property_name?: string;
  isStartBuild?: boolean;
  _id: string;
}

interface PropertyListingProps {
  properties: Property[];
  onEstimate: (id: string) => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({ properties, onEstimate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const propertiesPerPage = 5;
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Property[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkBuildingRequests = async () => {
      try {
        const constructorEmail = sessionStorage.getItem('userEmail');
        
        // Fetch all reports for the constructor
        const response = await axios.get(`http://localhost:3006/api/reports/email/${constructorEmail}`);
        const reports = response.data.data;
        
        // For each report, check if there's a corresponding property with isStartBuild
        for (const report of reports) {
          try {
            const areaRequestResponse = await axios.get(`http://localhost:3003/api/area-requests/${report.mongoId}`);
            
            if (areaRequestResponse.data && areaRequestResponse.data.isStartBuild) {
              // Find matching property from properties array
              const matchingProperty = properties.find(p => p._id === report.mongoId);
              if (matchingProperty) {
                setNotifications(prev => {
                  if (!prev.some(p => p._id === matchingProperty._id)) {
                    return [...prev, matchingProperty];
                  }
                  return prev;
                });
              }
            }
          } catch (error) {
            console.error(`Error checking area request for mongoId ${report.mongoId}:`, error);
          }
        }
      } catch (error) {
        console.error('Error fetching building requests:', error);
      }
    };

    checkBuildingRequests();
  }, [properties]);

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
        mongoId: property._id
      });
      
      console.log(property._id);
      
      
      navigate('/cost_estimation', {
        state: {
          id: property._id,
          mongoId: property._id,
          user_email: property.user_email,
          email: property.user_email,
          estimationResult: response.data,
          total_cost: response.data,
          builtup_area: property.builtup_area,
        },
      });

      onEstimate(property._id);
    } catch (error) {
      console.error('Error calculating estimation:', error);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/area-request-details/${id}`, {
      state: { id },
    });
  };
  const handleIconClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Box sx={{ padding: 2, background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        {notifications.length > 0 && (
          <Badge badgeContent={notifications.length} color="error">
            <Tooltip title="Construction Requests">
              <Icon
                sx={{
                  fontSize: 30,
                  color: '#1976d2',
                  marginRight: 1,
                  cursor: 'pointer',
                }}
                onClick={handleIconClick}
              >
                <MessageIcon fontSize="inherit" />
              </Icon>
            </Tooltip>
          </Badge>
        )}
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

      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
          Construction Requests
        </DialogTitle>
        <DialogContent>
          <List>
            {notifications.map((property) => (
              <ListItem 
                key={property._id}
                sx={{
                  mb: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ color: '#1976d2' }}>
                      {property.property_name || 'Unnamed Property'}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2">Owner: {property.user_name}</Typography>
                      <Typography variant="body2">Location: {property.city}, {property.state}</Typography>
                      <Typography variant="body2">Built-up Area: {property.builtup_area} sq ft</Typography>
                    </Box>
                  }
                />
                <Button 
                  variant="contained"
                  onClick={() => handleViewDetails(property._id)}
                  sx={{ ml: 2 }}
                >
                  View Details
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {paginatedProperties.map((property) => (
        <Card
          key={property._id}
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
              onClick={() => handleViewDetails(property._id)}
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
