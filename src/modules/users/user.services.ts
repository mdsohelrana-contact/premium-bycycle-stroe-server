import { TUser } from './user.interface';
import { User } from './user.model';

// createUserIntoDB
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
