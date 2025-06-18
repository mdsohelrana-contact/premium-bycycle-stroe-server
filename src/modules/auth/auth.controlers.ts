import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.services';
import responseHandelar from '../../utils/responseHandelar';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

const loginUser = catchAsync(async (req, res, next) => {
  try {
    const { token } = await authServices.loginUser(req.body);

    // res.cookie('accessToken', token, {
    //   secure: config.nodeEnv === 'production',
    //   httpOnly: true,
    //   sameSite: 'strict',
    // });

    responseHandelar(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Login Successful.',
      data: { accessToken: token },
    });
  } catch (error) {
    next(error);
  }
});

// // change password
const chnagePassword = catchAsync(async (req: CustomRequest, res) => {
  const changeInfo = req.body;
  const user = req.user;

  const result = await authServices.changePassword(user, changeInfo);

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

export const authControlers = {
  loginUser,
  chnagePassword,
};
