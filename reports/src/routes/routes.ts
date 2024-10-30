import express from 'express';
import {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport,
    generateChart,
    pieChart,
    doughChart,
} from '../controllers/controller';

const router = express.Router();

// GET all reports
router.get('/', getReports);

// Change the route to a more specific path
router.get('/generate/barChart', generateChart as any);

router.post('/generate/pieChart', pieChart as any);

router.get('/generate/doughChart', doughChart as any);

// GET single report by ID
router.get('/:id', getReportById as any);

// POST new report
router.post('/', createReport);

// PUT update report
router.put('/:id', updateReport as any);

// DELETE report
router.delete('/:id', deleteReport as any);

export default router;
