import { AppErrorStatusCodes } from "./APP_ERROR_STATUS_CODES";
import { AppError } from "./AppError.abstract";

export class UnauthenticatedException extends AppError {
  constructor(message = "Unauthenticated: Valid token is required.") {
    super(AppErrorStatusCodes.UNAUTHENTICATED, message);
    this.message = message;
  }
}
