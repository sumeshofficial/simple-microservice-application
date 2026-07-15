import type { AppErrorStatusCodes } from './APP_ERROR_STATUS_CODES';

export abstract class AppError extends Error {
	constructor(
		public readonly code: AppErrorStatusCodes,
		message: string,
	) {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		Error.captureStackTrace(this, this.constructor);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}