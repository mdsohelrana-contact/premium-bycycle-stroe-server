import mongoose from 'mongoose';
import { TErrorResponse, TErrorSources } from '../interface/error';

const handaleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handaleValidationError;
