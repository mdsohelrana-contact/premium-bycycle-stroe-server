import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import responseHandelar from '../../utils/responseHandelar';
import { User } from './user.model';
import { userServices } from './user.services';

// createUser
const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  // check is user already exists
  const isExists = await User.findOne({ email: userData.email });

  if (isExists) {
    return responseHandelar(res, {
      statusCode: StatusCodes.CONFLICT,
      success: false,
      message: 'User email already exists!.',
      data: null,
    });
  }

  const saveduserData = await userServices.createUserIntoDB(userData);

  responseHandelar(res, {
    statusCode: StatusCodes.CONFLICT,
    success: false,
    message: 'User register successful.',
    data: saveduserData,
  });
});

// export all user controlers methods
export const userControlers = {
  createUser,
};
