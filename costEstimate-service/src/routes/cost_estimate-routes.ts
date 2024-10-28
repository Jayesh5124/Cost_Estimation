import { Router } from 'express';
import { 
    createCostEstimate, 
    getAllCostEstimates, 
    getCostEstimateById, 
    updateCostEstimate, 
    deleteCostEstimate 
} from '../controllers/Cost_estimate-controller';

const router = Router();

// Define routes
router.post('/cost-estimates', createCostEstimate);
router.get('/cost-estimates', getAllCostEstimates);
router.get('/cost-estimates/:id', getCostEstimateById);
router.put('/cost-estimates/:id', updateCostEstimate);
router.delete('/cost-estimates/:id', deleteCostEstimate);

export default router;
