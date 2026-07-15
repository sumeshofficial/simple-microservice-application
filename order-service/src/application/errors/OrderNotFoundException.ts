import { AppErrorStatusCodes } from "./APP_ERROR_STATUS_CODES";
import { AppError } from "./AppError.abstract";

export class OrderNotFoundException extends AppError {
  constructor(message = "Order not found") {
    super(AppErrorStatusCodes.NOT_FOUND, message);
    this.message = message;
  }
}
