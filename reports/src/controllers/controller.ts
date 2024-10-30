import { Request, Response } from 'express';
import Report from '../model/reportSchema';  // Add this line
import QuickChart from 'quickchart-js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { Chart, ChartConfiguration } from 'chart.js';

// Get all reports
export const getReports = async (req: Request, res: Response) => {
    try {
        const reports = await Report.find();  // Use Report instead of IReport
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};



// Get a single report by ID
export const getReportById = async (req: Request, res: Response) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// Create a new report
export const createReport = async (req: Request, res: Response) => {
    const report = new Report({
        report_id: req.body.report_id,
        report_name: req.body.report_name,
        report_description: req.body.report_description,
        estimation_id: req.body.estimation_id,
        reports: req.body.reports
    });

    try {
        const newReport = await report.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// Update a report
export const updateReport = async (req: Request, res: Response) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        Object.assign(report, req.body);
        const updatedReport = await report.save();
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// Delete a report
export const deleteReport = async (req: Request, res: Response) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        
        await report.deleteOne();
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const generateChart = async (req: Request, res: Response) => {
    const chartData = {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Sample Data',
                data: [65, 59, 80, 81, 56],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    try {
        // Send chart configuration as JSON
        res.status(200).json(chartData);
    } catch (error) {
        console.error('Error sending chart data:', error);
        res.status(500).json({ error: 'Error sending chart data' });
    }
};

const pieChart = async (req: Request, res: Response) => {
    // Get chart data from request body
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid chart data format' });
    }

    const configuration: ChartConfiguration = {
        type: 'pie' as const,
        data: {
            labels: ['Cement', 'Sand', 'Fittings', 'Steel', 'Finishers', 'Aggregate'],
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    };

    try {
        // Create the chart
        const chartJSNodeCanvas = new ChartJSNodeCanvas({
            width: 800,
            height: 400,
            backgroundColour: 'white'
        });

        // Generate chart buffer
        const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);

        // Send as image
        res.contentType('image/png');
        res.send(buffer);
    } catch (error) {
        console.error('Error generating pie chart:', error);
        res.status(500).send('Error generating pie chart');
    }
};


const doughChart = async (req: Request, res: Response) => {
    // Get data from database or other source
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)', 
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)', 
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
            cutout: '70%' // This makes it a doughnut chart
        }]
    };

    const configuration: ChartConfiguration = {
        type: 'doughnut' as const,
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    };

    try {
        // Create the chart
        const chartJSNodeCanvas = new ChartJSNodeCanvas({
            width: 800,
            height: 400,
            backgroundColour: 'white'
        });

        // Generate chart buffer
        const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);

        // Send as image
        res.contentType('image/png');
        res.send(buffer);
    } catch (error) {
        console.error('Error generating doughnut chart:', error);
        res.status(500).send('Error generating doughnut chart');
    }
};

export { generateChart, pieChart, doughChart };
