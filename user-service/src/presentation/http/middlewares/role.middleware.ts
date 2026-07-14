import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@application/errors/UnauthorizedError";
import { ForbiddenError } from "@application/errors/ForbiddenError";
import { injectable } from "inversify";

@injectable()
export class RoleMiddleware {
  handle = (role: string) => {
    return (
      request: Request,
      _response: Response,
      next: NextFunction
    ): void => {
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
}
