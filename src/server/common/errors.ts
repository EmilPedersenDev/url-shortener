import HttpStatus from 'http-status';

export class NotFoundError extends Error {
  private statusCode: number;
  constructor(message: string = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}
