import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/http-status";
import { ResponseMessages } from "../constants/response-messages";
import { ErrorCodes } from "../constants/error-codes";
import { DomainException } from "@domain/exceptions/DomainException";
import { HttpStatusForErrorCode } from "../constants/http-status-for-error-codes";
import { AppError } from "@application/errors/AppError.abstract";
import z from "zod";
import { CustomZodValidationError } from "../errors/CustomZodValidationError";

export class ErrorHandlerMiddleware {
  static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    console.log(error);

    if (error instanceof AppError) {
      if (error instanceof CustomZodValidationError) {
        return res.status(HttpStatusForErrorCode[error.code]).json({
          success: false,
          code: error.code,
          message: error.message,
          errors: z.flattenError(error.zodError),
        });
      }
      return res.status(HttpStatusForErrorCode[error.code]).json({
        code: error.code,
        errors: error,
      });
    }

    if (error instanceof DomainException) {
      return res.status(error.httpStatus).json({
        success: false,
        message: error.message,
        code: error.code,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ResponseMessages.INTERNAL_SERVER_ERROR,
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
