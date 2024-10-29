
// import React, { useState } from 'react';
// import { Box, Typography, Button, Card, CardContent, Icon, TextField } from '@mui/material';
// import HomeWorkIcon from '@mui/icons-material/HomeWork';

// interface Property {
//   id: number;
//   name: string;
//   state: string;
//   city: string;
//   builtUpArea: string;
//   ownerName: string;
// }

// interface PropertyListingProps {
//   properties: Property[];
//   onViewDetails: (id: number) => void;
//   onEstimate: (id: number) => void;
// }

// const PropertyListing: React.FC<PropertyListingProps> = ({ properties, onViewDetails, onEstimate }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // Filter properties based on name or built-up area
//   const filteredProperties = properties.filter((property) => {
//     const builtUpAreaMatch = property.builtUpArea.includes(searchTerm);
//     const nameMatch = property.name.toLowerCase().includes(searchTerm.toLowerCase());
//     return nameMatch || builtUpAreaMatch;
//   });

//   return (
//     <Box sx={{ padding: 2, background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', minHeight: '100vh' }}>
//       {/* Search Box */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//         <TextField
//           label="Search by Name or Built-Up Area"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{
//             width: '300px',
//             '& .MuiOutlinedInput-root': {
//               borderRadius: '20px',
//               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//               backgroundColor: '#fff',
//               '& fieldset': { borderColor: '#1976d2' },
//               '&:hover fieldset': { borderColor: '#0d47a1' },
//               '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
//             },
//             '& .MuiInputLabel-outlined': {
//               color: '#1976d2',
//             },
//           }}
//         />
//       </Box>

//       {/* Property Cards */}
//       {filteredProperties.map((property) => (
//         <Card
//           key={property.id}
//           sx={{
//             display: 'flex',
//             mb: 3,
//             p: 3,
//             alignItems: 'center',
//             borderRadius: 3,
//             background: 'linear-gradient(to right,#919191, #f1f1f1)',
//             boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
//             transition: 'transform 0.2s ease-in-out',
//             '&:hover': { transform: 'scale(1.03)', boxShadow: '0 12px 28px rgba(0, 0, 0, 0.2)' },
//           }}
//         >
//           {/* Icon and Property Info */}
//           <Box sx={{ display: 'flex', width: '30%', alignItems: 'center' }}>
//             <Icon sx={{ fontSize: 60, color: 'black', marginRight: 2 }}>
//               <HomeWorkIcon fontSize="inherit" />
//             </Icon>
//             <Box>
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#181a1a' }}>{property.name}</Typography>
//               <Typography variant="body2" sx={{ color: '#45591c' }}>{property.state}</Typography>
//               <Typography variant="body2" sx={{ color: '#45591c' }}>{property.city}</Typography>
//               <Typography variant="body2" sx={{ color: '#4e342e', mt: 1 }}>Built-up Area: {property.builtUpArea}</Typography>
//               <Typography variant="body2" sx={{ color: '#4e342e' }}>Owner: {property.ownerName}</Typography>
//             </Box>
//           </Box>

//           {/* Property Details and Buttons */}
//           <CardContent sx={{ flexGrow: 1, ml: 3, borderLeft: '1px solid #b0bec5', pl: 3 }}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#181a1a' }}>Property Details</Typography>
//             <Typography variant="body2" sx={{ color: '#37474f', mb: 1 }}>
//               Explore detailed information about the property.
//             </Typography>
//             <Button
//               variant="outlined"
//               onClick={() => onViewDetails(property.id)}
//               sx={{
//                 color: '#0288d1',
//                 borderColor: '#0288d1',
//                 '&:hover': {
//                   backgroundColor: '#0288d1',
//                   color: '#fff',
//                   boxShadow: '0 4px 10px rgba(2, 136, 209, 0.3)',
//                 },
//               }}
//             >
//               View Details
//             </Button>
//           </CardContent>

//           {/* Estimate Button */}
//           <Box sx={{ textAlign: 'right', minWidth: '150px' }}>
//             <Button
//               variant="contained"
//               onClick={() => onEstimate(property.id)}
//               sx={{
//                 px: 3,
//                 py: 1.5,
//                 fontWeight: 'bold',
//                 borderRadius: '8px',
//                 backgroundColor: 'black',
//                 boxShadow: '0px 6px 16px rgba(255, 112, 67, 0.4)',
//                 '&:hover': {
//                   backgroundColor: 'gray',
//                   boxShadow: '0px 8px 20px rgba(230, 74, 25, 0.6)',
//                 },
//               }}
//             >
//               Estimate
//             </Button>
//           </Box>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// // export default PropertyListing;
// import React, { useState } from 'react';
// import { Box, Typography, Button, Card, CardContent, Icon, TextField, Pagination } from '@mui/material';
// import HomeWorkIcon from '@mui/icons-material/HomeWork';

// interface Property {
//   id: number;
//   name: string;
//   state: string;
//   city: string;
//   builtUpArea: string;
//   ownerName: string;
// }

// interface PropertyListingProps {
//   properties: Property[];
//   onViewDetails: (id: number) => void;
//   onEstimate: (id: number) => void;
// }

// const PropertyListing: React.FC<PropertyListingProps> = ({ properties, onViewDetails, onEstimate }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const propertiesPerPage = 5;

//   const handleSearch = () => {
//     setCurrentPage(1); // Reset to the first page after a new search
//   };

//   // Filter properties based on name or built-up area
//   const filteredProperties = properties.filter((property) => {
//     const builtUpAreaMatch = property.builtUpArea.includes(searchTerm);
//     const nameMatch = property.name.toLowerCase().includes(searchTerm.toLowerCase());
//     return nameMatch || builtUpAreaMatch;
//   });

//   // Calculate properties for the current page
//   const startIndex = (currentPage - 1) * propertiesPerPage;
//   const endIndex = startIndex + propertiesPerPage;
//   const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

//   return (
//     <Box sx={{ padding: 2, background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', minHeight: '100vh' }}>
//       {/* Search Box */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
//         <TextField
//           label="Search by Name or Built-Up Area"
//           variant="outlined"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{
//             width: '300px',
//             mr: 2,
//             '& .MuiOutlinedInput-root': {
//               borderRadius: '20px',
//               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//               backgroundColor: '#fff',
//               '& fieldset': { borderColor: '#1976d2' },
//               '&:hover fieldset': { borderColor: '#0d47a1' },
//               '&.Mui-focused fieldset': { borderColor: '#0d47a1' },
//             },
//             '& .MuiInputLabel-outlined': {
//               color: '#1976d2',
//             },
//           }}
//         />
//         {/* Pagination */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3,ml:10 }}>
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={(e, page) => setCurrentPage(page)}
//           color="primary"
//         />
//       </Box>
//       </Box>

//       {/* Property Cards */}
//       {paginatedProperties.map((property) => (
//         <Card
//           key={property.id}
//           sx={{
//             display: 'flex',
//             mb: 3,
//             p: 3,
//             alignItems: 'center',
//             borderRadius: 3,
//             background: 'linear-gradient(to right,#919191, #f1f1f1)',
//             boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
//             transition: 'transform 0.2s ease-in-out',
//             '&:hover': { transform: 'scale(1.03)', boxShadow: '0 12px 28px rgba(0, 0, 0, 0.2)' },
//           }}
//         >
//           <Box sx={{ display: 'flex', width: '30%', alignItems: 'center' }}>
//             <Icon sx={{ fontSize: 60, color: 'black', marginRight: 2 }}>
//               <HomeWorkIcon fontSize="inherit" />
//             </Icon>
//             <Box>
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#181a1a' }}>{property.name}</Typography>
//               <Typography variant="body2" sx={{ color: '#45591c' }}>{property.state}</Typography>
//               <Typography variant="body2" sx={{ color: '#45591c' }}>{property.city}</Typography>
//               <Typography variant="body2" sx={{ color: '#4e342e', mt: 1 }}>Built-up Area: {property.builtUpArea}</Typography>
//               <Typography variant="body2" sx={{ color: '#4e342e' }}>Owner: {property.ownerName}</Typography>
//             </Box>
//           </Box>

//           <CardContent sx={{ flexGrow: 1, ml: 3, borderLeft: '1px solid #b0bec5', pl: 3 }}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#181a1a' }}>Property Details</Typography>
//             <Typography variant="body2" sx={{ color: '#37474f', mb: 1 }}>
//               Explore detailed information about the property.
//             </Typography>
//             <Button
//               variant="outlined"
//               onClick={() => onViewDetails(property.id)}
//               sx={{
//                 color: '#0288d1',
//                 borderColor: '#0288d1',
//                 '&:hover': {
//                   backgroundColor: '#0288d1',
//                   color: '#fff',
//                   boxShadow: '0 4px 10px rgba(2, 136, 209, 0.3)',
//                 },
//               }}
//             >
//               View Details
//             </Button>
//           </CardContent>

//           <Box sx={{ textAlign: 'right', minWidth: '150px' }}>
//             <Button
//               variant="contained"
//               onClick={() => onEstimate(property.id)}
//               sx={{
//                 px: 3,
//                 py: 1.5,
//                 fontWeight: 'bold',
//                 borderRadius: '8px',
//                 backgroundColor: 'black',
//                 boxShadow: '0px 6px 16px rgba(255, 112, 67, 0.4)',
//                 '&:hover': {
//                   backgroundColor: 'gray',
//                   boxShadow: '0px 8px 20px rgba(230, 74, 25, 0.6)',
//                 },
//               }}
//             >
//               Estimate
//             </Button>
//           </Box>
//         </Card>
//       ))}

      
//     </Box>
//   );
// };

// export default PropertyListing;
import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Icon, TextField, Pagination } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

interface Property {
  id: number;
  name: string;
  state: string;
  city: string;
  builtUpArea: string;
  ownerName: string;
}

interface PropertyListingProps {
  properties: Property[];
  onViewDetails: (id: number) => void;
  onEstimate: (id: number) => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({ properties, onViewDetails, onEstimate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  // Handle search and reset current page
  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page after a new search
  };

  // Filter properties based on name or built-up area
  const filteredProperties = properties.filter((property) => {
    const builtUpAreaMatch = property.builtUpArea.includes(searchTerm);
    const nameMatch = property.name.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || builtUpAreaMatch;
  });

  // Calculate properties for the current page
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Update current page if it exceeds the total pages after filtering
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page > totalPages) {
      setCurrentPage(totalPages); // Ensure current page does not exceed total pages
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <Box sx={{ padding: 2, background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', minHeight: '100vh' }}>
      {/* Search Box */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
        <TextField
          label="Search by Name or Built-Up Area"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(); // Call handleSearch on input change
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
         {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, ml: 10 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange} // Update to use the handlePageChange function
          color="primary"
        />
      </Box>
      </Box>

     

      {/* Property Cards */}
      {paginatedProperties.map((property) => (
        <Card
          key={property.id}
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
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#181a1a' }}>{property.name}</Typography>
              <Typography variant="body2" sx={{ color: '#45591c' }}>{property.state}</Typography>
              <Typography variant="body2" sx={{ color: '#45591c' }}>{property.city}</Typography>
              <Typography variant="body2" sx={{ color: '#4e342e', mt: 1 }}>Built-up Area: {property.builtUpArea}</Typography>
              <Typography variant="body2" sx={{ color: '#4e342e' }}>Owner: {property.ownerName}</Typography>
            </Box>
          </Box>

          <CardContent sx={{ flexGrow: 1, ml: 3, borderLeft: '1px solid #b0bec5', pl: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#181a1a' }}>Property Details</Typography>
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
              onClick={() => onEstimate(property.id)}
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
              Estimate
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default PropertyListing;
