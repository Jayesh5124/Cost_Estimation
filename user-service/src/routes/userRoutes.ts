// import express from 'express';
// import { createUser, getAllUsers, getUserById, loginUser, updateUser } from '../controllers/userController';


// const router = express.Router();

// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.get('/users', getAllUsers); // Route to get all users
// router.get('/users/:id', getUserById);
// router.post('/login', loginUser);

// export default router;
import express from 'express';
import { createUser, getAllUsers, getUserById, loginUser, updateUser} from '../controllers/userController';

const router = express.Router();

router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
<<<<<<< HEAD
router.post('/users/login', loginUser as any);
=======
router.get('/users/login',loginUser as any);
>>>>>>> b8e7a7e3528188a87de4ea738f5879bb1d01b354


export default router;
