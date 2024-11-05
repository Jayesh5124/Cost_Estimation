import express, { Request, Response } from 'express';
import { Report } from '../model/reportSchema';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const {
      clientEmail,
      constructorEmail,
      builtupArea,
      totalCost,
      resourcesData,
      pdfReport,
      mongoId
    } = req.body;

    const report = new Report({
      clientEmail,
      constructorEmail,
      builtupArea,
      totalCost,
      resourcesData,
      pdfReport,
      mongoId
    });

    await report.save();

    res.json({
      success: true,
      message: 'Report saved successfully'
    });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save report'
    });
  }
});

router.get('/all', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports'
    });
  }
});

router.get('/email/:constructorEmail', async (req: Request, res: Response): Promise<void> => {
  try {
    const { constructorEmail } = req.params;
    
    if (!constructorEmail || typeof constructorEmail !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid email parameter'
      });
      return;
    }

    const reports = await Report.find({ constructorEmail }).lean();
    
    if (!reports || reports.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No reports found for this email'
      });
      return;
    }

    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports by email:', {
      constructorEmail: req.params.constructorEmail,
      error: error instanceof Error ? error.message : error
    });
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/:reportId', async (req: Request, res: Response) => {
  const { reportId } = req.params;
  const report = await Report.findById(reportId);
  res.json(report);
});

export default router;