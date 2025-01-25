import QueryBuilder from '../../queryBuilder/QueryBuilder';
import { TUser } from './user.interface';
import { User } from './user.model';

// createUserIntoDB
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

// all users
const getUsersFromDB = async (query: Record<string, unknown>) => {
  const userSearchFields = ['name', 'email'];

  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

// get a single user By ID service
const getSingleUser = async (productId: string) => {
  const product = await User.findOne({ _id: productId });
  return product;
};

// update user status
const updatedUserStatus = async (userId: string) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      isActive: false,
    },
    {
      new: true,
    },
  );
  return user;
};

export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUser,
  updatedUserStatus,
};
