import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// //! Define error interface
interface IError extends Error {
  statusCode: number;
  stack: string;
}

// //! Define global error
const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err as IError;
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    status: error.statusCode,
    message: error.message || "Something went wrong",
    stack: process.env.NODE_ENV === "DEVELOPMENT" ? error.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
