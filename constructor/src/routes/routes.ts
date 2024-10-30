import { Router } from 'express';
import * as constructorController from '../controllers/controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/register', constructorController.createConstructor);
router.post('/login', constructorController.loginConstructor);

// Protected routes
router.get('/listings', authMiddleware as any   , constructorController.getListings);
router.get('/dashboard', authMiddleware as any, constructorController.getDashboard);
router.get('/all-reports', authMiddleware as any, constructorController.getReports);
router.get('/view-project/:id', authMiddleware as any, constructorController.getViewProject);
router.get('/:id', authMiddleware as any, constructorController.getConstructor);

export default router;
