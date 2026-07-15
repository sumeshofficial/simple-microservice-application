import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export const CORRELATION_HEADER = "x-correlation-id";

export const correlationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId =
    (req.headers[CORRELATION_HEADER] as string) || randomUUID();

  (req as any).correlationId = correlationId;

  res.setHeader(CORRELATION_HEADER, correlationId);

  next();
};
