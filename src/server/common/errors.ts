import HttpStatus from 'http-status';
import { ValidationError } from 'express-validator';

export class ApiError extends Error {
  public readonly statusCode: number;
  constructor(errorMsg: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(errorMsg);
    this.statusCode = statusCode;
  }
}

export class ApiValidationError extends Error {
  public readonly errors: Array<ValidationError>;
  public statusCode: number;
  constructor(errorMsg: string, errors?: Array<ValidationError>) {
    super(errorMsg);
    this.statusCode = HttpStatus.BAD_REQUEST;
    this.errors = errors || [];
  }
}

export class NotFoundError extends Error {
  private statusCode: number;
  constructor(errorMsg: string = 'Not Found') {
    super(errorMsg);
    this.name = 'NotFoundError';
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
