import {
  AuthTokenPayload,
  ITokenGenerator,
} from "@application/ports/services/token-generator.service";
import { env } from "@config/env.config";
import jwt from "jsonwebtoken";

export class TokenGenerator implements ITokenGenerator {
  async generateAccessToken(payload: AuthTokenPayload): Promise<string> {
    const expiresIn = env.JWT_EXPIRES_IN as NonNullable<
      jwt.SignOptions["expiresIn"]
    >;

    return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
  }

  async verify(token: string): Promise<AuthTokenPayload> {
    return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
  }
}
