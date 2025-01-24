import bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { TLoginInfo } from './auth.interface';
import AppError from '../../errors/AppError';
import config from '../../config.ts/config';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginInfo) => {
  // find user by email
  const isUserExists = await User.findOne({
    email: payload.email,
  });

  // check isUserExists
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found !!');
  }

  // check is User isBlocked
  if (!isUserExists.isActive) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `${isUserExists.name} is deactivate !!`,
    );
  }

  //   now check valid password
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    isUserExists.password,
  );
  if (!isPasswordCorrect) {
    throw new Error('Incorrect password');
  }

  //   jwt payload
  const jwtPayload = {
    userId: isUserExists?._id,
    userEmail: isUserExists?.email,
    role: isUserExists?.role,
  };

  //   create JWT
  const token = jwt.sign(jwtPayload, `${config.jwtAccessToken}`, {
    expiresIn: '10d',
  });

  // If email and password are correct
  return { isUserExists, token };
};

export const authServices = {
  loginUser,
};
