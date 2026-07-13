import { AppErrorStatusCodes } from "./APP_ERROR_STATUS_CODES";
import { AppError } from "./AppError.abstract";

export class ForbiddenError extends AppError {
  constructor(message = "Access denied.") {
    super(AppErrorStatusCodes.FORBIDDEN, message);
    this.message = message;
  }
}
