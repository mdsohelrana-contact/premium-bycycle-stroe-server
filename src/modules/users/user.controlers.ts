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

// get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUsersFromDB(req.query);

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully.',
    data: result,
  });
});

// getSingle user data
const singleUserData = catchAsync(async (req, res) => {
  // searching ID
  const userId = req.params.id;

  const result = await userServices.updatedUserStatus(userId);

  if (!result) {
    responseHandelar(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'User not found!!.',
      data: null,
    });
  }

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${result?.name} is deactivated successfully.`,
    data: {},
  });
});

// getSingle user data
const updatedUserSttatus = catchAsync(async (req, res) => {
  // searching ID
  const userId = req.params.id;

  const result = await userServices.getSingleUser(userId);

  if (!result) {
    responseHandelar(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'User not found!!.',
      data: null,
    });
  }

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully.',
    data: result,
  });
});

// export all user controlers methods
export const userControlers = {
  createUser,
  getAllUsers,
  singleUserData,
  updatedUserSttatus,
};
