import React from 'react';
import { useParams } from 'react-router-dom';// Adjust this path as necessary
import { Container, Paper, Typography } from '@mui/material';
import { Property } from '../types/Property';

// Define styles for the component
const styles = {
    container: {
        minHeight: '100vh', // Make the container full height
        background: 'linear-gradient(to right, #f8f9fa, #e0f7fa)', // Gradient background
        padding: '20px',
    },
    paper: {
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    },
    title: {
        marginBottom: '15px',
        fontWeight: 'bold',
        color: '#00796b', // Custom title color
    },
    detailText: {
        marginBottom: '10px',
    },
};

const PropertyDetail: React.FC<{ properties: Property[] }> = ({ properties }) => {
    const { id } = useParams<{ id: string }>();

    const property = properties.find(prop => prop._id === id);

    if (!property) {
        return (
            <Container style={styles.container}>
                <Typography variant="h6" color="error">
                    Property not found.
                </Typography>
            </Container>
        );
    }

    // Render the property details
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
                {/* Additional properties can be rendered here */}
            </Paper>
        </Container>
    );
};

export default PropertyDetail;
