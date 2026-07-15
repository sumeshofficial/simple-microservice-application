import pino from "pino";
import { getCorrelationId } from "@shared/tracing/tracing-context";

export const logger = pino({
  level: "debug",
  mixin() {
    const correlationId = getCorrelationId();
    return correlationId ? { correlationId } : {};
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
