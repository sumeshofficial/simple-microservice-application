import { container } from "@config/di/container";
import { TYPES } from "@config/di/types";
import { env } from "@config/env.config";
import { disconnectDB } from "@infrastructure/repository/prisma.client";
import { ErrorHandlerMiddleware } from "@presentation/http/middlewares/error-handler.middleware";
import { tracingMiddleware } from "@presentation/http/middlewares/tracing.middleware";
import { OrderRouter } from "@presentation/http/router/order.router";
import { httpLogger } from "@shared/logger/http.logger";
import { logger } from "@shared/logger/logger";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(tracingMiddleware);
app.use(httpLogger);

app.use(express.json());

const PORT = env.PORT;

const orderRoutes = container.get<OrderRouter>(TYPES.OrderRoutes);

app.use(orderRoutes.router);

app.use(ErrorHandlerMiddleware.handle);

const bootstrap = async () => {

  const server = app.listen(PORT, () => {
    logger.info(`Order Service running on port ${PORT}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      logger.info("HTTP server closed.");
      await disconnectDB();
      logger.info("Database connection closed.");
      logger.info("Shutdown complete.");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

bootstrap().catch((error) => {
  logger.error(error, "Failed to start Order Service");
  process.exit(1);
});