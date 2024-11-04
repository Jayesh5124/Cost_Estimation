import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Card, CardContent, Icon, TextField, Pagination } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

interface Report {
  _id: string;
  clientEmail: string;
  builtupArea: number;
  totalCost: number;
  resourcesData: any[];
  createdAt: string;
}

interface PropertyBidProps {
  onViewDetails: (id: string) => void;
  onEstimate: (id: string) => void;
}

const PropertyBid: React.FC<PropertyBidProps> = ({ onViewDetails, onEstimate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3006/api/reports/all');
        setReports(response.data.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setReports([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const filteredReports = Array.isArray(reports) ? reports.filter((report) => {
    const builtUpAreaMatch = report.builtupArea?.toString().includes(searchTerm);
    const emailMatch = report.clientEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    return emailMatch || builtUpAreaMatch;
  }) : [];

  const startIndex = (currentPage - 1) * reportsPerPage;
  const endIndex = startIndex + reportsPerPage;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page > totalPages ? totalPages : page);
  };

  return (
    <Box sx={{ padding: 2, background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', minHeight: '100vh' }}>
      {/* Page Heading */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#0d47a1',
          textAlign: 'center',
          marginBottom: 4,
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Estimated Property
      </Typography>

      {/* Search Box */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        <TextField
          label="Search by Name or Built-Up Area"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch();
          }}
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
      </Box>

      {/* Add loading state */}
      {isLoading && (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          Loading reports...
        </Typography>
      )}

      {/* Add empty state */}
      {!isLoading && reports.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          No reports available
        </Typography>
      )}

      {/* Report Cards */}
      {paginatedReports.map((report) => (
        <Card
          key={report._id}
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
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#181a1a' }}>{report.clientEmail}</Typography>
              <Typography variant="body2" sx={{ color: '#4e342e', mt: 1 }}>Built-up Area: {report.builtupArea} sq ft</Typography>
              <Typography variant="body2" sx={{ color: '#4e342e' }}>Total Cost: ₹{report.totalCost}</Typography>
              <Typography variant="body2" sx={{ color: '#45591c' }}>Created: {new Date(report.createdAt).toLocaleDateString()}</Typography>
            </Box>
          </Box>

          <CardContent sx={{ flexGrow: 1, ml: 3, borderLeft: '1px solid #b0bec5', pl: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#181a1a' }}>Property Details</Typography>
            <Typography variant="body2" sx={{ color: '#37474f', mb: 1 }}>
              {report.resourcesData.length} resources available
            </Typography>
            <Button
              variant="outlined"
              onClick={() => onViewDetails(report._id)}
              sx={{
                color: '#0288d1',
                borderColor: '#0288d1',
                '&:hover': {
                  backgroundColor: '#0288d1',
                  color: '#fff',
                  boxShadow: '0 4px 10px rgba(2, 136, 209, 0.3)',
                },
              }}
            >
              View Details
            </Button>
          </CardContent>

          <Box sx={{ textAlign: 'right', minWidth: '150px' }}>
            <Button
              variant="contained"
              onClick={() => onEstimate(report._id)}
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
            >
              Start Building
            </Button>
          </Box>
        </Card>
      ))}

      {/* Pagination */}
      {!isLoading && reports.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default PropertyBid;
