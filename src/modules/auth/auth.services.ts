import bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { TChangePassword, TLoginInfo } from './auth.interface';
import config from '../../config/config';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { checkExistUser } from '../../utils/checkUserRole';

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

// change password
const changePassword = async (user: any, payload: TChangePassword) => {
  const userData = await checkExistUser(user.UserEmail);


  if (!userData.isActive) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deactivated!');
  }

  //   now check valid password
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password is mismatched  !');
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.saltRound),
  );

  await User.findOneAndUpdate(
    {
      _id: user?._id,
      role: user?.role,
    },
    {
      password: newHashPassword,
    },
  );

  return { message: 'Password changed successfully!' };
};

export const authServices = {
  loginUser,
  changePassword,
};
