import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
  } from '@mui/material';
  import { useState } from 'react';
  import CostBreakdownChart from '../user_components/breakDownCharts'; // Adjust the path as necessary
  
  const resourcesData = [
    { id: 1, resource: 'Concrete', quantity: '10 m³', amount: 1000 },
    { id: 2, resource: 'Steel', quantity: '200 kg', amount: 800 },
    { id: 3, resource: 'Wood', quantity: '50 m³', amount: 600 },
    { id: 4, resource: 'Brick', quantity: '1000', amount: 300 },
  ];
  
  const CostByResourceAllocation: React.FC = () => {
    const [selectedQuality, setSelectedQuality] = useState<{ [key: number]: string }>({});
    const [costData, setCostData] = useState<{ resource: string; amount: number }[]>([]); // State for the cost data
  
    const handleQualityChange = (resourceId: number, quality: string) => {
      setSelectedQuality((prev) => ({
        ...prev,
        [resourceId]: quality,
      }));
    };
  
    const handleCalculateEstimate = () => {
      const calculatedCosts = resourcesData.map((resource) => {
        const baseAmount = resource.amount;
        const qualityMultiplier = selectedQuality[resource.id] === 'Premium' ? 1.5 : selectedQuality[resource.id] === 'Moderate' ? 1.2 : 1; // Simple multipliers based on quality
        return {
          resource: resource.resource,
          amount: baseAmount * qualityMultiplier,
        };
      });
      setCostData(calculatedCosts); // Update the cost data
      console.log("Calculating estimate with selected qualities:", selectedQuality);
    };
  
    return (
      <Box sx={{ padding: 2, background: '#f0f0f0', minHeight: '100vh' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: '#263238',
            textAlign: 'center',
            marginBottom: 4,
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Cost By Resource Allocation
        </Typography>
  
        <TableContainer component={Paper} sx={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', borderRadius: '8px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Resource</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Quality</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resourcesData.map((row) => (
                <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell component="th" scope="row" sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>
                    {row.resource}
                  </TableCell>
                  <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>{row.quantity}</TableCell>
                  <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>
                    <RadioGroup
                      value={selectedQuality[row.id] || ''}
                      onChange={(event) => handleQualityChange(row.id, event.target.value)}
                      row
                    >
                      <FormControlLabel value="Basic" control={<Radio />} label="Basic" />
                      <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
                      <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
                    </RadioGroup>
                  </TableCell>
                  <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Calculate Estimate Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleCalculateEstimate}
            sx={{
              backgroundColor: '#0d47a1',
              color: '#fff',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#0a367a',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
              },
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Calculate Estimate
          </Button>
        </Box>
  
        {/* Display Cost Breakdown Chart */}
        {costData.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
              Cost Breakdown
            </Typography>
            <CostBreakdownChart data={costData} />
          </Box>
        )}
      </Box>
    );
  };
  
  export default CostByResourceAllocation;
  