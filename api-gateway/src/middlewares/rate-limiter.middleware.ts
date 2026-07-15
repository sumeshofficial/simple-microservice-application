import { env } from "@config/env.config";
import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: Number(env.RATE_LIMIT_WINDOW),
  max: Number(env.RATE_LIMIT_MAX_REQUESTS),
});