import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(
      token,
      config.jwtAccessToken as string,
    ) as JwtPayload;

    return decoded;
  } catch (err: any) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      err?.message || 'Invalid token',
    );
  }
};

export default verifyToken;
