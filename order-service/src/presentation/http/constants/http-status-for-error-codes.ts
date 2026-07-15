import { DomainErrorStatusCodes } from '@domain/exceptions/DOMAIN_ERROR_STATUS_CODES';
import { HttpStatus } from './http-status';
import type { ErrorCodes } from '@presentation/http/constants/error-codes';
import { AppErrorStatusCodes } from '@application/errors/APP_ERROR_STATUS_CODES';

export const HttpStatusForErrorCode: Record<ErrorCodes, HttpStatus> = {
	// Domain Error Codes
	[DomainErrorStatusCodes.ORDER_STATE_INVALID_TRANSITION]: HttpStatus.PRECONDITION_FAILED,

	[AppErrorStatusCodes.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
	[AppErrorStatusCodes.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
	[AppErrorStatusCodes.FORBIDDEN]: HttpStatus.FORBIDDEN,
	[AppErrorStatusCodes.NOT_FOUND]: HttpStatus.NOT_FOUND,
	[AppErrorStatusCodes.CONFLICT]: HttpStatus.CONFLICT,
	[AppErrorStatusCodes.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
	[AppErrorStatusCodes.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
	[AppErrorStatusCodes.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED
};