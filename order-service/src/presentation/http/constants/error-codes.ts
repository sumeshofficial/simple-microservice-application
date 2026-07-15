import { AppErrorStatusCodes } from "@application/errors/APP_ERROR_STATUS_CODES";
import { DomainErrorStatusCodes } from "@domain/exceptions/DOMAIN_ERROR_STATUS_CODES";

export const ErrorCodes = {
  ...AppErrorStatusCodes,
  ...DomainErrorStatusCodes,
} as const;

export type ErrorCodes = (typeof ErrorCodes)[keyof typeof ErrorCodes];
