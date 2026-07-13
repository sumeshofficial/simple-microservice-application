export const DomainErrorStatusCodes = {
	USER_NOT_FOUND: 'USER_NOT_FOUND',
	INVALID_EMAIL: 'INVALID_EMAIL',
	INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
	USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
} as const;

export type DomainErrorStatusCodes =
	(typeof DomainErrorStatusCodes)[keyof typeof DomainErrorStatusCodes];