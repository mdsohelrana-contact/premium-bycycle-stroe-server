import { Router } from 'express';
import { authControlers } from './auth.controlers';
import validateRequest from '../../middlewares/validatedRequest';
import { authValidation } from './auth.validation';
import auth from '../../middlewares/auth';

const authRouter = Router();

authRouter.post(
  '/auth/login',
  validateRequest(authValidation.loginInfoValidationSchema),
  authControlers.loginUser,
);

// authRouter.post(
//   '/auth/change-password',
//   auth('customer'),
//   validateRequest(authValidation.changePasswordValidationSchema),
//   authControlers.chnagePassword,
// );

export default authRouter;
