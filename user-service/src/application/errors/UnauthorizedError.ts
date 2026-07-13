import { AppErrorStatusCodes } from "./APP_ERROR_STATUS_CODES";
import { AppError } from "./AppError.abstract";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access.") {
    super(AppErrorStatusCodes.UNAUTHORIZED, message);
    this.message = message;
  }
}
