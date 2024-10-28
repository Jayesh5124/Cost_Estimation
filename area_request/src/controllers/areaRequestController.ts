// controllers/areaRequestController.ts

import { Request, Response } from 'express';
import { AreaRequestService } from '../services/areaRequestService';
import { IAreaRequest } from '../models/areaRequest';

const areaRequestService = new AreaRequestService();

// Create a new area request
export const createAreaRequest = async (req: Request, res: Response) => {
    try {
        const { user_id, city, state, builtup_area } = req.body;
        const areaRequest = await areaRequestService.createAreaRequest({ user_id, city, state, builtup_area }as IAreaRequest);
        res.status(201).json(areaRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create area request' });
    }
};

// Get all area requests
export const getAllAreaRequests = async (req: Request, res: Response) => {
    try {
        const requests = await areaRequestService.getAllAreaRequests();
        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve area requests' });
    }
};

// Get area request by ID
export const getAreaRequestById = async (req: Request, res: Response) => {
    try {
        const request = await areaRequestService.getAreaRequestById(req.params.id);
        if (request) {
            res.status(200).json(request);
        } else {
            res.status(404).json({ error: 'Area request not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve area request' });
    }
};

// Update area request
export const updateAreaRequest = async (req: Request, res: Response) => {
    try {
        const updatedRequest = await areaRequestService.updateAreaRequest(req.params.id, req.body);
        if (updatedRequest) {
            res.status(200).json(updatedRequest);
        } else {
            res.status(404).json({ error: 'Area request not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update area request' });
    }
};

// Delete area request
export const deleteAreaRequest = async (req: Request, res: Response) => {
    try {
        const deletedRequest = await areaRequestService.deleteAreaRequest(req.params.id);
        if (deletedRequest) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Area request not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete area request' });
    }
};
