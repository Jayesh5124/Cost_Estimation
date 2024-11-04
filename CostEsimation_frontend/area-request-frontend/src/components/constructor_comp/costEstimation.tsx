// import {
//     Box,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
//     RadioGroup,
//     FormControlLabel,
//     Radio,
//   } from '@mui/material';
//   import { useState } from 'react';
//   import CostBreakdownChart from '../user_components/breakDownCharts'; // Adjust the path as necessary
//   import { useLocation } from 'react-router-dom';
  
//   const resourcesData = [
//     { id: 1, resource: 'Cement', quantity: '50 bags', amount: 1000 },
//     { id: 2, resource: 'Sand', quantity: '15 m³', amount: 800 },
//     { id: 3, resource: 'Aggregate', quantity: '20 m³', amount: 700 },
//     { id: 4, resource: 'Steel', quantity: '200 kg', amount: 900 },
//     { id: 5, resource: 'Paint', quantity: '40 L', amount: 400 },
//     { id: 6, resource: 'Bricks', quantity: '2000 pcs', amount: 600 },
//     { id: 7, resource: 'Flooring', quantity: '100 m²', amount: 800 },
//   ];
  
//   const CostByResourceAllocation: React.FC = () => {
//     const location = useLocation();
//     const { estimationResult, total_cost } = location.state || { estimationResult: 0, total_cost: 0 };
  
//     // Update resourcesData based on total cost
//     const updatedResourcesData = resourcesData.map(resource => ({
//       ...resource,
//       amount: Math.round((resource.amount / 2700) * total_cost) // Adjust the base amounts proportionally
//     }));
  
//     const [selectedQuality, setSelectedQuality] = useState<{ [key: number]: string }>({});
//     const [costData, setCostData] = useState<{ resource: string; amount: number }[]>(
//       updatedResourcesData.map(resource => ({
//         resource: resource.resource,
//         amount: resource.amount
//       }))
//     );
  
//     // Add new state to track if estimate has been calculated
//     const [isEstimateCalculated, setIsEstimateCalculated] = useState(false);
  
//     const handleQualityChange = (resourceId: number, quality: string) => {
//       setSelectedQuality((prev) => ({
//         ...prev,
//         [resourceId]: quality,
//       }));
//     };
  
//     const handleCalculateEstimate = () => {
//       const calculatedCosts = updatedResourcesData.map((resource) => {
//         const baseAmount = resource.amount;
//         const qualityMultiplier = selectedQuality[resource.id] === 'Premium' ? 1.5 : selectedQuality[resource.id] === 'Moderate' ? 1.2 : 1; // Simple multipliers based on quality
//         return {
//           resource: resource.resource,
//           amount: baseAmount * qualityMultiplier,
//         };
//       });
//       setCostData(calculatedCosts); // Update the cost data
//       setIsEstimateCalculated(true); // Set to true when estimate is calculated
//       console.log("Calculating estimate with selected qualities:", selectedQuality);
//     };
  
//     return (
//       <Box sx={{ padding: 2, background: '#f0f0f0', minHeight: '100vh' }}>
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: 'bold',
//             color: '#263238',
//             textAlign: 'center',
//             marginBottom: 4,
//             textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
//             fontFamily: 'Arial, sans-serif',
//           }}
//         >
//           Cost By Resource Allocation
//         </Typography>
  
//         {/* Add Total Cost Display */}
//         <Box
//           sx={{
//             backgroundColor: '#ffffff',
//             padding: 3,
//             borderRadius: '8px',
//             marginBottom: 3,
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: 1
//           }}
//         >
//           <Typography variant="h6" color="text.secondary">
//             Total Estimated Cost
//           </Typography>
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 'bold',
//               color: '#0d47a1',
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1
//             }}
//           >
//             ₹{total_cost.toLocaleString()}
//           </Typography>
//         </Box>
  
//         <TableContainer component={Paper} sx={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', borderRadius: '8px' }}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Resource</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Quantity</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1', textAlign: 'center' }}>Quality</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Amount</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {updatedResourcesData.map((row) => (
//                 <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
//                   <TableCell component="th" scope="row" sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>
//                     {row.resource}
//                   </TableCell>
//                   <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>{row.quantity}</TableCell>
//                   <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc', minWidth: '300px' }}>
//                     <RadioGroup
//                       value={selectedQuality[row.id] || ''}
//                       onChange={(event) => handleQualityChange(row.id, event.target.value)}
//                       row
//                       sx={{
//                         justifyContent: 'space-between',
//                         '& .MuiFormControlLabel-root': {
//                           margin: '0 8px'
//                         }
//                       }}
//                     >
//                       <FormControlLabel value="Basic" control={<Radio />} label="Basic" />
//                       <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
//                       <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
//                     </RadioGroup>
//                   </TableCell>
//                   <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>{row.amount}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
  
//         {/* Calculate Estimate Button */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <Button
//             variant="contained"
//             onClick={handleCalculateEstimate}
//             sx={{
//               backgroundColor: '#0d47a1',
//               color: '#fff',
//               padding: '10px 20px',
//               '&:hover': {
//                 backgroundColor: '#0a367a',
//                 boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
//               },
//               borderRadius: '8px',
//               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
//             }}
//           >
//             Calculate Estimate
//           </Button>
//         </Box>
  
//         {/* Display Cost Breakdown Chart */}
//         {isEstimateCalculated && costData.length > 0 && (
//           <Box sx={{ mt: 4 }}>
//             <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
//               Cost Breakdown
//             </Typography>
//             <CostBreakdownChart data={costData} />
//           </Box>
//         )}
//       </Box>
//     );
//   };
  
//   export default CostByResourceAllocation;
  














import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, RadioGroup, FormControlLabel, Radio,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from 'react';
import CostBreakdownChart from '../user_components/breakDownCharts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface ResourceData {
  resource: string;
  quantity: string;
  amount: number;
  id: number;
}

interface QuantityResponse {
  cementReq: number;
  cementCost: number;
  sandReq: number;
  sandCost: number;
  aggregateReq: number;
  aggregateCost: number;
  steelReq: number;
  steelCost: number;
  paintReq: number;
  bricks: number;
  fittings: number;
  finishers: number;
}

const CostByResourceAllocation: React.FC = () => {
  const location = useLocation();
  const { estimationResult, total_cost } = location.state || { estimationResult: 0, total_cost: 0 };

  const [resourcesData, setResourcesData] = useState<ResourceData[]>([]);
  const [selectedQuality, setSelectedQuality] = useState<{ [key: number]: string }>({});
  const [costData, setCostData] = useState<{ resource: string; amount: number }[]>([]);
  const [isEstimateCalculated, setIsEstimateCalculated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial quantities
  useEffect(() => {
    fetchQuantities();
  }, []);



  const fetchQuantities = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3005/api/cost-estimates/quantity-wise/${total_cost}/${estimationResult}`);
      const data: QuantityResponse = response.data;

      const newResourcesData: ResourceData[] = [
        { id: 1, resource: 'Cement', quantity: `${data.cementReq.toFixed(2)} bags`, amount: data.cementCost },
        { id: 2, resource: 'Sand', quantity: `${data.sandReq.toFixed(2)} m³`, amount: data.sandCost },
        { id: 3, resource: 'Aggregate', quantity: `${data.aggregateReq.toFixed(2)} m³`, amount: data.aggregateCost },
        { id: 4, resource: 'Steel', quantity: `${data.steelReq.toFixed(2)} kg`, amount: data.steelCost },
        { id: 5, resource: 'Paint', quantity: `${data.paintReq.toFixed(2)} L`, amount: data.finishers },
        { id: 6, resource: 'Bricks', quantity: `${data.bricks} pcs`, amount: data.fittings },
      ];

      setResourcesData(newResourcesData);
      setCostData(newResourcesData.map(resource => ({
        resource: resource.resource,
        amount: resource.amount
      })));
    } catch (error) {
      console.error('Error fetching quantities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQualityChange = (resourceId: number, quality: string) => {
    setSelectedQuality(prev => ({
      ...prev,
      [resourceId]: quality,
    }));
  };

  const handleCalculateEstimate = async () => {
    try {
      setIsLoading(true);
      await fetchQuantities();
      
      const calculatedCosts = resourcesData.map((resource) => {
        const baseAmount = resource.amount;
        const qualityMultiplier = selectedQuality[resource.id] === 'Premium' ? 1.5 : 
                                 selectedQuality[resource.id] === 'Moderate' ? 1.2 : 1;
        return {
          resource: resource.resource,
          amount: baseAmount * qualityMultiplier,
        };
      });
      
      setCostData(calculatedCosts);
      setIsEstimateCalculated(true);
    } catch (error) {
      console.error('Error calculating estimate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

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

      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: 3,
          borderRadius: '8px',
          marginBottom: 3,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Total Estimated Cost
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#0d47a1',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          ₹{total_cost.toLocaleString()}
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', borderRadius: '8px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Resource</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1', textAlign: 'center' }}>Quality</TableCell>
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
                <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc', minWidth: '300px' }}>
                  <RadioGroup
                    value={selectedQuality[row.id] || ''}
                    onChange={(event) => handleQualityChange(row.id, event.target.value)}
                    row
                    sx={{
                      justifyContent: 'space-between',
                      '& .MuiFormControlLabel-root': {
                        margin: '0 8px'
                      }
                    }}
                  >
                    <FormControlLabel value="Basic" control={<Radio />} label="Basic" />
                    <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
                    <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
                  </RadioGroup>
                </TableCell>
                <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>
                  ₹{row.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

      {isEstimateCalculated && costData.length > 0 && (
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

















// import {
//   Box, Typography, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, Button, RadioGroup, FormControlLabel, Radio,
//   CircularProgress
// } from '@mui/material';
// import { useState, useEffect } from 'react';
// import CostBreakdownChart from '../user_components/breakDownCharts';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// interface ResourceData {
//   resource: string;
//   quantity: string;
//   amount: number;
//   id: number;
// }

// interface QuantityResponse {
//   cementReq: number;
//   cementCost: number;
//   sandReq: number;
//   sandCost: number;
//   aggregateReq: number;
//   aggregateCost: number;
//   steelReq: number;
//   steelCost: number;
//   paintReq: number;
//   bricks: number;
//   fittings: number;
//   finishers: number;
// }

// const CostByResourceAllocation: React.FC = () => {
//   const location = useLocation();
//   const { estimationResult = 0, total_cost = 0 } = location.state || {};

//   const [resourcesData, setResourcesData] = useState<ResourceData[]>([]);
//   const [selectedQuality, setSelectedQuality] = useState<{ [key: number]: string }>({});
//   const [costData, setCostData] = useState<{ resource: string; amount: number }[]>([]);
//   const [isEstimateCalculated, setIsEstimateCalculated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch initial quantities
//   useEffect(() => {
//     fetchQuantities();
//   }, [total_cost]);

//   const fetchQuantities = async () => {
//     try {
//       setIsLoading(true);
//       setError(null); // Clear any previous errors
//       console.log("Fetching data with total_cost:", total_cost, "and estimationResult:", estimationResult);
      
//       const response = await axios.get(`http://localhost:3005/api/cost-estimates/quantity-wise/${total_cost}/${estimationResult}`);
//       const data: QuantityResponse = response.data;

//       const newResourcesData: ResourceData[] = [
//         { id: 1, resource: 'Cement', quantity: `${data.cementReq.toFixed(2)} bags`, amount: data.cementCost },
//         { id: 2, resource: 'Sand', quantity: `${data.sandReq.toFixed(2)} m³`, amount: data.sandCost },
//         { id: 3, resource: 'Aggregate', quantity: `${data.aggregateReq.toFixed(2)} m³`, amount: data.aggregateCost },
//         { id: 4, resource: 'Steel', quantity: `${data.steelReq.toFixed(2)} kg`, amount: data.steelCost },
//         { id: 5, resource: 'Paint', quantity: `${data.paintReq.toFixed(2)} L`, amount: data.finishers },
//         { id: 6, resource: 'Bricks', quantity: `${data.bricks} pcs`, amount: data.fittings },
//       ];

//       setResourcesData(newResourcesData);
//       setCostData(newResourcesData.map(resource => ({
//         resource: resource.resource,
//         amount: resource.amount
//       })));
//     } catch (error) {
//       setError("Failed to fetch data. Please try again later.");
//       console.error("Error fetching quantities:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleQualityChange = (resourceId: number, quality: string) => {
//     setSelectedQuality(prev => ({
//       ...prev,
//       [resourceId]: quality,
//     }));
//   };

//   const handleCalculateEstimate = async () => {
//     try {
//       setIsLoading(true);
//       await fetchQuantities();
      
//       const calculatedCosts = resourcesData.map((resource) => {
//         const baseAmount = resource.amount;
//         const qualityMultiplier = selectedQuality[resource.id] === 'Premium' ? 1.5 : 
//                                  selectedQuality[resource.id] === 'Moderate' ? 1.2 : 1;
//         return {
//           resource: resource.resource,
//           amount: baseAmount * qualityMultiplier,
//         };
//       });
      
//       setCostData(calculatedCosts);
//       setIsEstimateCalculated(true);
//     } catch (error) {
//       setError("Error calculating estimate. Please try again.");
//       console.error("Error calculating estimate:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 2, background: '#f0f0f0', minHeight: '100vh' }}>
//       <Typography
//         variant="h3"
//         sx={{
//           fontWeight: 'bold',
//           color: '#263238',
//           textAlign: 'center',
//           marginBottom: 4,
//           textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
//           fontFamily: 'Arial, sans-serif',
//         }}
//       >
//         Cost By Resource Allocation
//       </Typography>

//       {error && (
//         <Typography variant="h6" color="error" align="center">
//           {error}
//         </Typography>
//       )}

//       <Box
//         sx={{
//           backgroundColor: '#ffffff',
//           padding: 3,
//           borderRadius: '8px',
//           marginBottom: 3,
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 1
//         }}
//       >
//         <Typography variant="h6" color="text.secondary">
//           Total Estimated Cost
//         </Typography>
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 'bold',
//             color: '#0d47a1',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1
//           }}
//         >
//           ₹{total_cost.toLocaleString()}
//         </Typography>
//       </Box>

//       <TableContainer component={Paper} sx={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', borderRadius: '8px' }}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Resource</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Quantity</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1', textAlign: 'center' }}>Quality</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: '#0d47a1' }}>Amount</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {resourcesData.map((row) => (
//               <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
//                 <TableCell component="th" scope="row" sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>
//                   {row.resource}
//                 </TableCell>
//                 <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>{row.quantity}</TableCell>
//                 <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc', minWidth: '300px' }}>
//                   <RadioGroup
//                     value={selectedQuality[row.id] || ''}
//                     onChange={(event) => handleQualityChange(row.id, event.target.value)}
//                     row
//                     sx={{
//                       justifyContent: 'space-between',
//                       '& .MuiFormControlLabel-root': {
//                         margin: '0 8px'
//                       }
//                     }}
//                   >
//                     <FormControlLabel value="Basic" control={<Radio />} label="Basic" />
//                     <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
//                     <FormControlLabel value="Premium" control={<Radio />} label="Premium" />
//                   </RadioGroup>
//                 </TableCell>
//                 <TableCell sx={{ color: '#45591c', borderBottom: '1px solid #ccc' }}>
//                   ₹{row.amount.toLocaleString()}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <Button
//           variant="contained"
//           onClick={handleCalculateEstimate}
//           sx={{
//             backgroundColor: '#0d47a1',
//             color: '#fff',
//             padding: '10px 20px',
//             '&:hover': {
//               backgroundColor: '#0a367a',
//               boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
//             },
//           }}
//         >
//           Calculate Estimate
//         </Button>
//       </Box>

//       {isEstimateCalculated && (
//         <CostBreakdownChart data={costData} />
//       )}
//     </Box>
//   );
// };

// export default CostByResourceAllocation;























