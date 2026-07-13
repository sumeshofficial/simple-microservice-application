import { DomainErrorStatusCodes } from "./DOMAIN_ERROR_STATUS_CODES";

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

export class UserAlreadyExistsEception extends DomainException {
    constructor(email: string) {
        super(`user with email ${email} already exists`, DomainErrorStatusCodes.USER_ALREADY_EXISTS, 409),
        Object.setPrototypeOf(this, UserAlreadyExistsEception.prototype);
        this.name = 'UserAlreadyExistsException';
    }
}

export class UserNotFoundException extends DomainException {
    constructor() {
        super('User does not exist.', DomainErrorStatusCodes.USER_NOT_FOUND, 404),
        Object.setPrototypeOf(this, UserNotFoundException.prototype);
        this.name = 'UserNotFoundException';
    }
}

export class InvalidCredentialsException extends DomainException {
	constructor() {
		super('Invalid credentials provided', DomainErrorStatusCodes.INVALID_CREDENTIALS, 401);
		Object.setPrototypeOf(this, InvalidCredentialsException.prototype);
		this.name = 'InvalidCredentialsException';
	}
}