/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../common/errors';

class ErrorHandler {
  public static handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
      res.status(err.statusCode).send({
        error: err.statusCode,
        message: err.message,
      });
    }
    res.status(500).send({
      error: 500,
      message: err?.message || 'Internal server error',
    });
  }

  public static handleUncaughtError(err: Error): void {
    // Todo: implement
  }
}

export default ErrorHandler;
