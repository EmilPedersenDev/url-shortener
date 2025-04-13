import { body, param, Result, ValidationChain, ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ApiValidationError } from '../common/errors';

export const createShortUrlValidator: ValidationChain[] = [
  body('originalUrl').isString().trim().notEmpty().withMessage('originalUrl is not a valid string.'),
];

export const getOriginalUrlValidator: ValidationChain[] = [
  param('hash').isString().trim().notEmpty().withMessage('hash is not a valid string.'),
];

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    const apiValidationError: ApiValidationError = new ApiValidationError('Validation error', errors.array());
    res.status(apiValidationError.statusCode).send({
      error: apiValidationError.statusCode,
      message: apiValidationError.message,
      errors: apiValidationError.errors,
    });
    return;
  }
  return next();
};
