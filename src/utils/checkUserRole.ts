import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import { User } from '../modules/users/user.model';

export async function checkUserRole(
  userEmail: string | undefined,
  allowedRoles: string[],
) {
  if (!userEmail) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User email is required');
  }

  const user = await User.findOne({ email: userEmail })
  
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!allowedRoles.includes(user.role)) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
  }

  return user;
}

// check user is exist 
export const checkExistUser = async (userEmail: string | undefined) => {
  if (!userEmail) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User email is required');
  }

  const user = await User.findOne({ email: userEmail })

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;  
}
