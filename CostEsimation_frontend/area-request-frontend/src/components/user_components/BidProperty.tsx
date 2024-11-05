import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Card, CardContent, Icon, TextField, Pagination, Modal, Paper } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Report {
  _id: string;
  clientEmail: string;
  constructorEmail: string;
  builtupArea: number;
  totalCost: number;
  resourcesData: any[];
  pdfReport: string;
  createdAt: string;
  __v: number;
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
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      console.log(sessionStorage.getItem('userEmail'));
      
      try {
        const response = await axios.get(`http://localhost:3006/api/reports/email/${sessionStorage.getItem('userEmail')}`);
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

  const handleOpenModal = async (clientEmail: string) => {
    try {
      const response = await axios.get(`http://localhost:3006/api/reports/email/${clientEmail}`);
      const reportData = response.data.data.find((report: Report) => report.clientEmail === clientEmail);
      setSelectedReport(reportData);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching report details:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  const handleDownloadPDF = async () => {
    if (selectedReport?.pdfReport) {
      try {
        window.open(selectedReport.pdfReport, '_blank');
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    }
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
              <Typography variant="body2" sx={{ color: '#45591c' }}>Estimated By: {report.constructorEmail}</Typography>
            </Box>
          </Box>

          <CardContent sx={{ flexGrow: 1, ml: 3, borderLeft: '1px solid #b0bec5', pl: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#181a1a' }}>Property Details</Typography>
            <Typography variant="body2" sx={{ color: '#37474f', mb: 1 }}>
              {report.resourcesData.length} resources available
            </Typography>
            <Button
              variant="outlined"
              onClick={() => handleOpenModal(report.clientEmail)}
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

      {/* Add Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="report-details-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            width: '80%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'auto',
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          {selectedReport && (
            <>
              <Typography variant="h4" sx={{ mb: 3, color: '#0d47a1' }}>
                Report Details
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Client Information
                </Typography>
                <Typography><strong>Report ID:</strong> {selectedReport._id}</Typography>
                <Typography><strong>Email:</strong> {selectedReport.clientEmail}</Typography>
                <Typography><strong>Estimated By:</strong> {selectedReport.constructorEmail}</Typography>
                <Typography><strong>Built-up Area:</strong> {selectedReport.builtupArea} sq ft</Typography>
                <Typography><strong>Total Cost:</strong> ₹{selectedReport.totalCost?.toLocaleString() || '0'}</Typography>
                <Typography><strong>Created:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Resources
                </Typography>
                {selectedReport.resourcesData.map((resource: any, index: number) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                    <Typography><strong>Resource Name:</strong> {resource.resource}</Typography>
                    <Typography><strong>Quantity:</strong> {resource.quantity}</Typography>
                    <Typography><strong>Cost:</strong> ₹{resource.amount?.toLocaleString() || '0'}</Typography>
                  </Paper>
                ))}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                {selectedReport.pdfReport && (
                  <Button
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                    onClick={() => {
                      // Create a link element and trigger download using base64 PDF data
                      const link = document.createElement('a');
                      link.href = selectedReport.pdfReport;
                      link.download = `report-${selectedReport._id}.pdf`;
                      link.click();
                    }}
                    sx={{
                      bgcolor: '#0288d1',
                      '&:hover': { bgcolor: '#01579b' },
                    }}
                  >
                    Download PDF
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{ ml: 'auto' }}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default PropertyBid;
