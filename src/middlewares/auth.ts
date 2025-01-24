/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import { TUserRole } from '../constant/user.role';
import config from '../config.ts/config';
import { User } from '../modules/users/user.model';

const auth = (...userRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return next(
          new AppError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'),
        );
      }

      let decoded;
      try {
        // checking if the given token is valid
        decoded = jwt.verify(
          token,
          config.jwtAccessToken as string,
        ) as JwtPayload;
      } catch (err) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED!');
      }

      // Verify token
      jwt.verify(token, `${config.jwtAccessToken}`, async (err, decoded) => {
        if (err) {
          return next(
            new AppError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'),
          );
        }

        const { userId, role } = decoded as JwtPayload;

        // checking if the user is exist
        const user = await User.findById(userId);

        if (!user) {
          throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
        }
        // checking if the user is already deleted

        if (!user.isActive) {
          throw new AppError(
            StatusCodes.FORBIDDEN,
            'This user is deactivate  !',
          );
        }

        //statek user role
        if (userRoles.length && !userRoles.includes(role as TUserRole)) {
          return next(
            new AppError(StatusCodes.UNAUTHORIZED, 'You are UNAUTHORIZED'),
          );
        }

        // Attach the decoded token to the request object
        // req.user = decoded as JwtPayload;

        next();
      });
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
