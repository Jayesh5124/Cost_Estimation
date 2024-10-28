import { Request, Response } from 'express';
import { UserService } from '../services/userService'; // Import the user service

const userService = new UserService(); // Instantiate the user service

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, projectId } = req.body;
        const user = await userService.createUser({ name, email, password, projectId });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    // try {
    //     const { id } = req.params;
    //     const { name, email, password, projectId } = req.body;
    //     const user = await userService.updateUser(id, { name, email, password, projectId });

    //     if (!user) return res.status(404).json({ error: 'User not found' });
    //     res.status(200).json(user);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to update user' });
    // }
};
export const getAllUsers = async(req: Request, res: Response)=>
{
    const users = await userService.getAllUsers();
    res.status(200).json(users);

}

export const getUserById = async (req: Request, res: Response) => {
 
    // try{
    //     const { id } = req.params;
    //     const user = await userService.getUserById(id);
    //     if(!user) return res.status(404).json({ error: 'User not found' });
    //     res.status(200).json(user);
    // }
    // catch(error){
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to get user' });
    
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
};