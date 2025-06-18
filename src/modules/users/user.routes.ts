import { Router } from 'express';
import { userControlers } from './user.controlers';
import validateRequest from '../../middlewares/validatedRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';

const userRoutes = Router();

// post user data
userRoutes.post(
  '/auth/register',
  validateRequest(userValidation.userValidationSchema),
  userControlers.createUser,
);

// get all users data
userRoutes.get('/users', auth('admin'), userControlers.getAllUsers)

// get my profile data
userRoutes.get('/users/me', auth('customer',"admin"), userControlers.myProfile);


// get single user data
userRoutes.get('/users/:id', auth('admin',"customer"), userControlers.singleUserData);

//   user status updated
userRoutes.patch('/users/:id', auth('admin'), userControlers.singleUserData);



export default userRoutes;
