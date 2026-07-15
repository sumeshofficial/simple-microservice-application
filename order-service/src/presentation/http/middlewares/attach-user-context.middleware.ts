import { UnauthenticatedException } from "@application/errors/UnauthenticatedException";
import type { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";

@injectable()
export class AttachUserContextMiddleware {
  handle = (req: Request, _res: Response, next: NextFunction) => {
    try {
      const userId = req.headers["x-jwt-user-id"] as string;
      const role = req.headers["x-jwt-role"] as string | undefined;

      if (!userId) {
        throw new UnauthenticatedException();
      }

      req.user = {
        id: userId,
        role: role as string,
      };
      next();
    } catch (error) {
      next();
    }
  };
}
