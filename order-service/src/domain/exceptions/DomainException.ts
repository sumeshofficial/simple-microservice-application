export class DomainException extends Error {
  public readonly httpStatus: number;

  constructor(
    message: string,
    public readonly code: string,
    httpStatus = 400
  ) {
    super(message);
    Object.setPrototypeOf(this, DomainException.prototype);
    this.name = "DomainException";
    this.httpStatus = httpStatus;
    Error.captureStackTrace(this, this.constructor);
  }
}