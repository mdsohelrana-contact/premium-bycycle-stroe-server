/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import { TUserRole } from '../constant/user.role';
import config from '../config/config';
import { User } from '../modules/users/user.model';
import verifyToken from '../utils/verifyToken';

interface CustomRequest extends Request {
  user?: JwtPayload;
}


const auth = (...userRoles: TUserRole[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return next(
          new AppError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'),
        );
      }

      const decoded = verifyToken(token) ;


      const { userId, role } = decoded;

      if (!userId) {
        return next(
          new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token payload'),
        );
      }

      const user = await User.findById(userId);

      if (!user) {
        return next(
          new AppError(StatusCodes.NOT_FOUND, 'This user is not found!'),
        );
      }

      if (!user.isActive) {
        return next(
          new AppError(StatusCodes.UNAUTHORIZED, 'This user is not active!'),
        );
      }

      if (userRoles.length && !userRoles.includes(role)) {
        return next(
          new AppError(
            StatusCodes.FORBIDDEN,
            'You do not have permission to access this resource',
          ),
        );
      }
      req.user = decoded ;

      next();
    } catch (error: any) {
      next(
        new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          `${error.message || 'Something went wrong'}`,
        ),
      );
    }
  };
};

export default auth;
