import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/cost_estimate-routes';


// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Port configuration
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
if (!MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
