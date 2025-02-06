import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { authServices } from './auth.services';
import responseHandelar from '../../utils/responseHandelar';

const loginUser = catchAsync(async (req, res, next) => {
  try {
    const { token } = await authServices.loginUser(req.body);

    const accessToken = {
      accessToken: token,
    };

    responseHandelar(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Login Successful.',
      data: accessToken,
    });
  } catch (error) {
    next(error);
  }
});

// // change password
const chnagePassword = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const changeInfo = req.body;

  const result = await authServices.changePassword(userId, changeInfo);

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
