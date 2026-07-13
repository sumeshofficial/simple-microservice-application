import type { Request, Response, NextFunction } from "express";

export const attachUserContext = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers["x-jwt-userid"] as string;
    const name = req.headers["x-jwt-name"] as string;
    const role = req.headers["x-jwt-role"] as string | undefined;

    if (!userId) {
      return next();
    }

    req.user = {
      id: userId,
      name: name || "",
      role: role as string,
    };
    next();
  } catch (error) {
    next();
  }
};
