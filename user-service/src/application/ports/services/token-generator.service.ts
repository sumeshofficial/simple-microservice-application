import { Role } from "@domain/value-objects/user-role";

export interface ITokenGenerator {
	generateAccessToken(payload: AuthTokenPayload): Promise<string>;
	verify(token: string): Promise<AuthTokenPayload>;
}

export interface AuthTokenPayload {
	userId: string;
	name: string;
	role?: Role;
}