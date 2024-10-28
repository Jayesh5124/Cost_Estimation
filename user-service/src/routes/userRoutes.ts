import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser } from '../controllers/userController';


const router = express.Router();

router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.get('/users', getAllUsers); // Route to get all users
router.get('/users/:id', getUserById);

export default router;
