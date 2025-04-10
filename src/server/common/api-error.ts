class ApiError extends Error {
  public readonly statusCode: number;
  constructor(errorMsg: string, statusCode: number) {
    super(errorMsg);
    this.statusCode = statusCode;
  }
}
export default ApiError;
