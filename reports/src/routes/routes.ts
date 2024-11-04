import express, { Request, Response } from 'express';
import { Report } from '../model/reportSchema';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const {
      clientEmail,
      builtupArea,
      totalCost,
      resourcesData,
      pdfReport
    } = req.body;

    const report = new Report({
      clientEmail,
      builtupArea,
      totalCost,
      resourcesData,
      pdfReport
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

router.get('/email/:clientEmail', async (req: Request, res: Response): Promise<any> => {
  try {
    const { clientEmail } = req.params;
    const reports = await Report.find({ clientEmail });
    
    if (reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No reports found for this email'
      });
    }

    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports by email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports'
    });
  }
});

export default router;