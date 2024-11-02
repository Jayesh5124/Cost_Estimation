
// // import React from 'react';
// // import { useParams } from 'react-router-dom';
// // import { Property } from '../types/Property'; // Adjust this path as necessary

// // const PropertyDetail: React.FC<{ properties: Property[] }> = ({ properties }) => {
// //     const { email } = useParams<{ email: string }>();

// //     const property = properties.find(prop => prop.user_email === email);

// //     if (!property) {
// //         return (
// //             <div>Property not found.</div>
// //         );
// //     }

// //     // Render the property details
// //     return (
// //         <div>
// //             <h2>{property.property_name}</h2>
// //             <p>Owner: {property.user_name}</p>
// //             <p>Email: {property.user_email}</p>
// //             <p>City: {property.city}</p>
// //             <p>State: {property.state}</p>
// //             <p>Built-up Area: {property.builtup_area} sq ft</p>
// //             <p>Property Type: {property.property_type}</p>
// //             <p>Land Clearance Needed: {property.land_clearance_needed ? 'Yes' : 'No'}</p>
// //             <p>Floors Needed: {property.floors_needed}</p>
// //             {/* Additional properties can be rendered here */}
// //         </div>
// //     );
// // };

// // export default PropertyDetail;import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Property } from '../types/Property'; // Adjust this path as necessary
// import { Container, Paper, Typography } from '@mui/material';

// // Define styles for the component
// const styles = {
//     container: {
//         minHeight: '100vh', // Make the container full height
//         background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', // Gradient background
//         padding: '20px',
//     },
//     paper: {
//         padding: '20px',
//         marginTop: '20px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
//     },
//     title: {
//         marginBottom: '15px',
//         fontWeight: 'bold',
//         color: '#00796b', // Custom title color
//     },
//     detailText: {
//         marginBottom: '10px',
//     },
// };

// const PropertyDetail: React.FC<{ properties: Property[] }> = ({ properties }) => {
//     const { email } = useParams<{ email: string }>();

//     const property = properties.find(prop => prop.user_email === email);

//     if (!property) {
//         return (
//             <Container style={styles.container}>
//                 <Typography variant="h6" color="error">
//                     Property not found.
//                 </Typography>
//             </Container>
//         );
//     }

//     // Render the property details
//     return (
//         <Container style={styles.container}>
//             <Paper elevation={3} style={styles.paper}>
//                 <Typography variant="h4" style={styles.title}>
//                     {property.property_name}
//                 </Typography>
//                 <Typography variant="body1" style={styles.detailText}><strong>Owner:</strong> {property.user_name}</Typography>
//                 <Typography variant="body1" style={styles.detailText}><strong>Email:</strong> {property.user_email}</Typography>
//                 <Typography variant="body1" style={styles.detailText}><strong>City:</strong> {property.city}</Typography>
//                 <Typography variant="body1" style={styles.detailText}><strong>State:</strong> {property.state}</Typography>
//                 <Typography variant="body1" style={styles.detailText}><strong>Built-up Area:</strong> {property.builtup_area} sq ft</Typography>
//                 <Typography variant="body1" style={styles.detailText}><strong>Property Type:</strong> {property.property_type}</Typography>
//                 <Typography variant="body1" style={styles.detailText}><strong>Land Clearance Needed:</strong> {property.land_clearance_needed ? 'Yes' : 'No'}</Typography>
//                 <Typography variant="body1" style={styles.detailText}><strong>Floors Needed:</strong> {property.floors_needed}</Typography>
//                 {/* Additional properties can be rendered here */}
//             </Paper>
//         </Container>
//     );
// };

// export default PropertyDetail;import React from 'react';
import { useParams } from 'react-router-dom';
import { Property } from '../types/Property'; // Adjust this path as necessary
import { Container, Paper, Typography } from '@mui/material';

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)',
        padding: '20px',
    },
    paper: {
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '15px',
        fontWeight: 'bold',
        color: '#00796b',
    },
    detailText: {
        marginBottom: '10px',
    },
};

const PropertyDetail: React.FC<{ properties: Property[] }> = ({ properties }) => {
    const { email } = useParams<{ email: string }>();

    const property = properties.find(prop => prop.user_email === email);

    if (!property) {
        return (
            <Container style={styles.container}>
                <Typography variant="h6" color="error">
                    Property not found.
                </Typography>
            </Container>
        );
    }

    return (
        <Container style={styles.container}>
            <Paper elevation={3} style={styles.paper}>
                <Typography variant="h4" style={styles.title}>
                    {property.property_name}
                </Typography>
                <Typography variant="body1" style={styles.detailText}><strong>Owner:</strong> {property.user_name}</Typography>
                <Typography variant="body1" style={styles.detailText}><strong>Email:</strong> {property.user_email}</Typography>
                <Typography variant="body1" style={styles.detailText}><strong>City:</strong> {property.city}</Typography>
                <Typography variant="body1" style={styles.detailText}><strong>State:</strong> {property.state}</Typography>
                <Typography variant="body1" style={styles.detailText}><strong>Built-up Area:</strong> {property.builtup_area} sq ft</Typography>
                <Typography variant="body1" style={styles.detailText}><strong>Property Type:</strong> {property.property_type}</Typography>
                <Typography variant="body1" style={styles.detailText}><strong>Land Clearance Needed:</strong> {property.land_clearance_needed ? 'Yes' : 'No'}</Typography>
                <Typography variant="body1" style={styles.detailText}><strong>Floors Needed:</strong> {property.floors_needed}</Typography>
                
                {property.flats_per_floor !== undefined && (
                    <Typography variant="body1" style={styles.detailText}><strong>Flats Per Floor:</strong> {property.flats_per_floor}</Typography>
                )}
                {property.cabins_needed !== undefined && (
                    <Typography variant="body1" style={styles.detailText}><strong>Cabins Needed:</strong> {property.cabins_needed}</Typography>
                )}
                {property.land_clearance !== undefined && (
                    <Typography variant="body1" style={styles.detailText}><strong>Land Clearance:</strong> {property.land_clearance}</Typography>
                )}
                
                
                {property.constructorList && property.constructorList.length > 0 && (
                    <>
                        <Typography variant="body1" style={styles.detailText}><strong>Constructors:</strong></Typography>
                        <ul>
                            {property.constructorList.map((constructor, index) => (
                                <li key={index}>
                                    <Typography variant="body1" style={styles.detailText}>
                                        {constructor.name} - {constructor.experience} years of experience
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default PropertyDetail;
