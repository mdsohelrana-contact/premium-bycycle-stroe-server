import { Router } from 'express';
import { userControlers } from './user.controlers';
import validateRequest from '../../middlewares/validatedRequest';
import { userValidation } from './user.validation';

const userRoutes = Router();

// post user data
userRoutes.post(
  '/auth/register',
  validateRequest(userValidation.userValidationSchema),
  userControlers.createUser,
);

export default userRoutes;
