// routes/areaRequestRoutes.ts

import express from 'express';
import {
    createAreaRequest,
    getAllAreaRequests,
    getAreaRequestById,
    updateAreaRequest,
    deleteAreaRequest,
} from '../controllers/areaRequestController';

const router = express.Router();

// Define routes
router.post('/area-requests', createAreaRequest);
router.get('/area-requests', getAllAreaRequests);
router.get('/area-requests/:id', getAreaRequestById);
router.put('/area-requests/:id', updateAreaRequest);
router.delete('/area-requests/:id', deleteAreaRequest);

export default router;
