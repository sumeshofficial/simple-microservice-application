import { AppErrorStatusCodes } from "./APP_ERROR_STATUS_CODES";
import { AppError } from "./AppError.abstract";

export class UnauthorizedException extends AppError {
  constructor(
    message = "Unauthorized access. Requires elevated privileges.",
    code: AppErrorStatusCodes = AppErrorStatusCodes.FORBIDDEN
  ) {
    super(code, message);
    this.message = message;
  }
}
