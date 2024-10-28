import { Request, Response } from 'express';
import { CostEstimateService } from '../services/CostEstimateService';
import { ICostEstimate } from '../models/cost_estimates';

const costEstimateService = new CostEstimateService();

// Create a new cost estimate
export const createCostEstimate = async (req: Request, res: Response) => {
    try {
        const { project_id,  constructor_id, total_estimate } = req.body;

        // Make sure to pass the correct object type to the service
        const estimate = await costEstimateService.createCostEstimate({
            project_id,
            
            constructor_id,
            total_estimate,
        } as ICostEstimate); // Assert the type if necessary

        res.status(201).json(estimate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create cost estimate' });
    }
};

// Get all cost estimates
export const getAllCostEstimates = async (req: Request, res: Response) => {
    try {
        const estimates = await costEstimateService.getAllCostEstimates();
        res.status(200).json(estimates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve cost estimates' });
    }
};

// Get cost estimate by ID
export const getCostEstimateById = async (req: Request, res: Response) => {
    try {
        const estimate = await costEstimateService.getCostEstimateById(req.params.id);
        if (estimate) {
            res.status(200).json(estimate);
        } else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve cost estimate' });
    }
};

// Update cost estimate
export const updateCostEstimate = async (req: Request, res: Response) => {
    try {
        const updatedEstimate = await costEstimateService.updateCostEstimate(req.params.id, req.body);
        if (updatedEstimate) {
            res.status(200).json(updatedEstimate);
        } else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update cost estimate' });
    }
};

// Delete cost estimate
export const deleteCostEstimate = async (req: Request, res: Response) => {
    try {
        const deletedEstimate = await costEstimateService.deleteCostEstimate(req.params.id);
        if (deletedEstimate) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cost estimate not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete cost estimate' });
    }
};
