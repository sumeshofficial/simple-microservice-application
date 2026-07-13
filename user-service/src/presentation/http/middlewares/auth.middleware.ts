import type { NextFunction, Request, Response } from "express";
import {
  AuthTokenPayload,
  ITokenGenerator,
} from "@application/ports/services/token-generator.service";
import { UnauthorizedError } from "@application/errors/UnauthorizedError";
import { ForbiddenError } from "@application/errors/ForbiddenError";

// export const authenticate = (tokenService: ITokenGenerator) => {
//   return async (
//     request: Request,
//     _response: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     const authHeader = request.headers.authorization;

//     if (!authHeader?.startsWith("Bearer ")) {
//       return next(new UnauthorizedError());
//     }

//     const [, token] = authHeader.split(" ");

//     if (!token) {
//       return next(new UnauthorizedError());
//     }

//     try {
//       const payload: AuthTokenPayload = await tokenService.verify(token);
//       //   request.user = { id: payload.userId};
//       next();
//     } catch {
//       return next(new UnauthorizedError());
//     }
//   };
// };

export const authorize = (role: string) => {
  return (request: Request, _response: Response, next: NextFunction): void => {
    const user = request.user;

    if (!user) {
      next(new UnauthorizedError());
      return;
    }

    if (role !== user.role) {
      next(new ForbiddenError());
      return;
    }

    next();
  };
};
