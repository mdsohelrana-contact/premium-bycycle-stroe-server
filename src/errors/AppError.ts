/* eslint-disable @typescript-eslint/no-explicit-any */
class AppError extends Error {
  public statusCode: number;
  public errorDetails?: any;

  constructor(statusCode: number, message: string, stack?: string) {
    super(message);
    this.statusCode = statusCode;

    // Use the provided stack or capture it from the error's instantiation point
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Generate a structured error response
  toResponse() {
    return {
      success: false,
      statusCode: this.statusCode,
      message: this.message,
      stack: this.stack || null,
    };
  }
}

export default AppError;
