export const DomainErrorStatusCodes = {
	ORDER_STATE_INVALID_TRANSITION: 'ORDER_STATE_INVALID_TRANSITION',
} as const;

export type DomainErrorStatusCodes =
	(typeof DomainErrorStatusCodes)[keyof typeof DomainErrorStatusCodes];