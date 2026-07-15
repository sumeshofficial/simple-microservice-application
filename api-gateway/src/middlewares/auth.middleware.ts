import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "@config/env.config";
import logger from "@config/logger.config";
import { HttpStatus } from "@utils/http-status";
import { UserPayload } from "@custom-types/user-context.types";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    logger.warn(
      `Unauthorized access attempt: No Bearer token provided for ${req.path}`
    );
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Unauthenticated: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Unauthenticated: Token format invalid" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as UserPayload;
    (req as any).user = decoded;
    return next();
  } catch (error) {
    logger.error("JWT Verification failed", error);
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Unauthenticated: Invalid or expired token" });
  }
};
