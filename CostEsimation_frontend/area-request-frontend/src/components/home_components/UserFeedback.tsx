import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

interface Feedback {
  username: string;
  rating: number;
  description: string;
}

const feedbacks: Feedback[] = [
  { username: 'Alice', rating: 5, description: 'Highly accurate cost estimation!' },
  { username: 'Bob', rating: 4, description: 'Easy to use and reliable results.' },
  { username: 'Carol', rating: 5, description: 'This tool saved me a lot of time!' }
];

const UserFeedback: React.FC = () => {
  return (
    <Box sx={{ padding: '2rem ', backgroundColor: 'darkgray', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        User Feedback
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {feedbacks.map((feedback, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '5px' }}>
              <Typography variant="h5">{feedback.username}</Typography>
              <Typography variant="body1">Rating: {'⭐'.repeat(feedback.rating)}</Typography>
              <Typography variant="body2">{feedback.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserFeedback;
