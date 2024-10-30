import { Request, Response } from 'express';
import { UserService } from '../services/userService'; // Import the user service
// Adjust the path based on your file structure
import { IUser } from '../models/User';



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
    }
      
// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     // Fetch user by email
//     const user = await userService.login_user(email);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the stored password
//     // (assuming you haven’t hashed passwords, but it's recommended to do so)
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Login successful, respond with user information (optionally add JWT token)
//     res.json({
//       message: 'Login successful',
//     // Add role information if needed
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// }
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Fetch user by email
    const user = await userService.login_user(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare provided password with stored password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Login successful
    return res.json({
     user_email: user.email,
     user_name: user.name,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};
