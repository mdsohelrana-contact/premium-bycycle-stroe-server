import mongoose from "mongoose";
import config from "./config";

export const connectDb = async () => {
  try {
    await mongoose.connect(`${config.databaseUrl}`);
    console.error("Database connection successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
