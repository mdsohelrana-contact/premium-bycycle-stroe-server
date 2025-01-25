/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { TErrorSources } from '../interfaces/error';
import handaleZodError from '../errors/handaleZodError';
import handaleValidationError from '../errors/handaleValidationError';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import config from '../config.ts/config';

// //! Define global error
const globalErrorHandlar: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const fieldError = handaleZodError(err);
    statusCode = fieldError?.statusCode;
    message = fieldError?.message;
    errorSources = fieldError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const fieldError = handaleValidationError(err);
    statusCode = fieldError?.statusCode;
    message = fieldError?.message;
    errorSources = fieldError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.nodeEnv === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandlar;
