import mongoose from 'mongoose';
import config from './config';

export const connectDb = async () => {
  try {
    await mongoose.connect(`${config.databaseUrl}`);
  } catch (error) {
    return error;
  }
};
