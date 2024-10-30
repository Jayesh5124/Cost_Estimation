import { Request, Response } from 'express';
import Constructor, { IConstructor } from '../models/constructorSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function for consistent responses
const sendResponse = (res: Response, status: number, data: any) => {
  res.status(status).json(data);
};

// Get user by ID
export const getConstructor = async (req: Request, res: Response) => {
  try {
    const constructor = await Constructor.findById(req.params.id).select('-password');
    if (!constructor) {
      return sendResponse(res, 404, { error: 'Constructor not found' });
    }
    sendResponse(res, 200, constructor);
  } catch (error) {
    sendResponse(res, 500, { error: 'Error fetching constructor' });
  }
};

// Create a new user
export const createConstructor = async (req: Request, res: Response) => {
  try {
    const { email, password, createdAt, ...otherData } = req.body;
    
    // Add debug logging
    console.log('Received registration request:', {
      email: email,
      hasPassword: !!password,
      createdAt,
      otherData
    });

    // Validate required fields
    if (!email?.trim() || !password?.trim()) {
      return sendResponse(res, 400, { 
        error: 'Email and password are required',
        debug: { 
          emailReceived: email,
          passwordReceived: !!password
        }
      });
    }

    // Format the date properly
    let formattedDate;
    try {
      if (createdAt) {
        // Parse the date string (assuming format DD-MM-YY)
        const [day, month, year] = createdAt.split('-');
        formattedDate = new Date(`20${year}-${month}-${day}`).toISOString();
      } else {
        formattedDate = new Date().toISOString();
      }
    } catch (dateError) {
      return sendResponse(res, 400, { 
        error: 'Invalid date format. Please use DD-MM-YY format',
        debug: { receivedDate: createdAt }
      });
    }

    // Check if email already exists
    const existingUser = await Constructor.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, { error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Constructor.create({
      ...otherData,
      email,
      password: hashedPassword,
      createdAt: formattedDate
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    const userWithoutPassword = { ...newUser.toObject(), password: undefined };
    
    sendResponse(res, 201, { constructor: userWithoutPassword, token });
  } catch (error) {
    console.error('Error creating constructor:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    sendResponse(res, 500, { 
      error: 'Error creating user',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

// Get all listings
export const getListings = async (_req: Request, res: Response) => {
  try {
    const constructors = await Constructor.find().select('-password');
    sendResponse(res, 200, constructors);
  } catch (error) {
    sendResponse(res, 500, { error: 'Error fetching listings' });
  }
};

// Get project by ID
export const getViewProject = async (req: Request, res: Response) => {
  try {
    const project = await Constructor.findById(req.params.id).select('-password');
    if (!project) {
      return sendResponse(res, 404, { error: 'Project not found' });
    }
    sendResponse(res, 200, project);
  } catch (error) {
    sendResponse(res, 500, { error: 'Error fetching project' });
  }
};

// Get reports
export const getReports = async (_req: Request, res: Response) => {
  try {
    const reports = await Constructor.find().select('estimations');
    sendResponse(res, 200, reports);
  } catch (error) {
    sendResponse(res, 500, { error: 'Error fetching reports' });
  }
};

// Get dashboard data
export const getDashboard = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const userData = await Constructor.findById(userId).select('-password');
    sendResponse(res, 200, userData);
  } catch (error) {
    sendResponse(res, 500, { error: 'Error fetching dashboard data' });
  }
};

// Login
export const loginConstructor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const constructor = await Constructor.findOne({ email });
    if (!constructor) {
      return sendResponse(res, 401, { error: 'Invalid login credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, constructor.password);
    if (!isMatch) {
      return sendResponse(res, 401, { error: 'Invalid login credentials' });
    }
    
    const token = jwt.sign({ id: constructor._id }, JWT_SECRET);
    const constructorWithoutPassword = { ...constructor.toObject(), password: undefined };
    
    sendResponse(res, 200, { constructor: constructorWithoutPassword, token });
  } catch (error) {
    sendResponse(res, 500, { error: 'Error logging in' });
  }
};
