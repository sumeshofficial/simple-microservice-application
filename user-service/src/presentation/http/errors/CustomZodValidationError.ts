import { AppErrorStatusCodes } from '@application/errors/APP_ERROR_STATUS_CODES';
import { AppError } from '@application/errors/AppError.abstract';
import type z from 'zod';

export class CustomZodValidationError extends AppError {
	constructor(
		public readonly zodError: z.ZodError,
		message?: string,
	) {
		super(AppErrorStatusCodes.VALIDATION_ERROR, message ?? 'Validation failed');
	}
}