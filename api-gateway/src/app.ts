import express, { Application, Request, Response } from "express";
import cors from "cors";
import { correlationIdMiddleware } from "@middlewares/correlation-id.middleware";
import { rateLimiter } from "@middlewares/rate-limiter.middleware";
import { requestLoggerMiddleware } from "@middlewares/request-logger.middleware";
import { ProxyService } from "@proxy/proxy.service";
import logger from "@config/logger.config";
import { HttpStatus } from "@utils/http-status";
import { errorMiddleware } from "@middlewares/error.middleware";
import helmet from "helmet";

const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(helmet());

  app.use(correlationIdMiddleware);

  app.use(rateLimiter);

  app.use(requestLoggerMiddleware);

  app.use(express.json({ type: "*/*" }));

  ProxyService.setupProxy(app);

  app.use((req: Request, res: Response) => {
    logger.warn(`Resource not found: ${req.method} ${req.url}`);
    res.status(HttpStatus.NOT_FOUND).json({
      message: "Resource not found",
      timestamp: new Date().toISOString(),
    });
  });

  app.use(errorMiddleware);

  return app;
};

export const app = createApp();
