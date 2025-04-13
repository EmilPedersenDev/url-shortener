import HttpStatus from 'http-status';
import { ValidationError } from 'express-validator';

enum ErrorNames {
  BaseError = 'BaseError',
  ApiError = 'ApiError',
  ApiValidationError = 'ApiValidationError',
  NotFoundError = 'NotFoundError',
}

export class BaseError extends Error {
  public name: string;
  public statusCode: number;
  constructor(
    message: string = 'Internal server error.',
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    name: string = ErrorNames.BaseError,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

export class ApiError extends BaseError {
  constructor(errorMsg: string, statusCode: number) {
    super(errorMsg, statusCode, ErrorNames.ApiError);
  }
}

export class ApiValidationError extends BaseError {
  public readonly errors: Array<ValidationError>;
  constructor(errorMsg: string, errors?: Array<ValidationError>) {
    super(errorMsg, HttpStatus.BAD_REQUEST, ErrorNames.ApiValidationError);
    this.errors = errors || [];
  }
}

export class NotFoundError extends BaseError {
  constructor(errorMsg: string = 'Not Found') {
    super(errorMsg, HttpStatus.NOT_FOUND, ErrorNames.NotFoundError);
  }
}
