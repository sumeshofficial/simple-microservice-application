import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { CustomZodValidationError } from "../errors/CustomZodValidationError";

type ValidationTarget = "body" | "query" | "params";

export class ValidationMiddleware {
  static validate(schema: z.ZodSchema, target: ValidationTarget = "body") {
    return async (req: Request, _res: Response, next: NextFunction) => {
      try {
        req[target] = await schema.parseAsync(req[target]);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          return next(new CustomZodValidationError(error));
        }
        next(error);
      }
    };
  }
}
