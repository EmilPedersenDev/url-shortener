import { NextFunction, Request, Response } from 'express';
import ApiError from './api-error';

type AsyncRouteHandler = (req: Request, res: Response, next?: NextFunction) => Promise<Response | void>;
export default (routeHandler: AsyncRouteHandler): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async function tryCatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await routeHandler(req, res, next);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let statusCode = 500;
      let message = 'Internal server error';
      if (error?.statusCode && typeof error.statusCode === 'number') {
        statusCode = error.statusCode;
      }
      if (error?.message && typeof error.message === 'string') {
        message = error.message;
      }
      const apiError = new ApiError(message, statusCode);
      next(apiError);
    }
  };
};
