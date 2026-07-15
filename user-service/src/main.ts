import { env } from "@config/env.config";
import { MongoDatabase } from "@infrastructure/repository/DatabaseInstance";
import { ErrorHandlerMiddleware } from "@presentation/http/middlewares/error-handler.middleware";
import { AuthRouter } from "@presentation/http/router/auth.router";
import { UserRouter } from "@presentation/http/router/user.router";
import "reflect-metadata";
import express from "express";
import { container } from "@config/di/container";
import { TYPES } from "@config/di/types";
import {
  server as grpcServer,
  startGrpcServer,
} from "@presentation/grpc/user.grpc.server";
import { seedAdmin } from "@infrastructure/repository/seed";
import { httpLogger } from "@shared/logger/http.logger";
import { tracingMiddleware } from "@presentation/http/middlewares/tracing.middleware";
import helmet from "helmet";
import { logger } from "@shared/logger/logger";

const app = express();

app.use(helmet());
app.use(tracingMiddleware);
app.use(httpLogger);

app.use(express.json());

const authRoutes = container.get<AuthRouter>(TYPES.AuthRoutes);
const userRoutes = container.get<UserRouter>(TYPES.UserRoutes);

app.use(authRoutes.router);
app.use(userRoutes.router);

app.use(ErrorHandlerMiddleware.handle);

const PORT = env.PORT;

const bootstrap = async () => {
  const mongo = MongoDatabase.getInstance();
  await mongo.connect();
  await seedAdmin(container);
  await startGrpcServer();

  const server = app.listen(PORT, () => {
    logger.info(`User service running on port: ${PORT}`);
  });

  const shutdown = async () => {
    grpcServer.tryShutdown((err) => {
      if (err) {
        logger.error(err, "Error shutting down gRPC server");
      } else {
        logger.info("gRPC server closed");
      }
    });
    server.close(async () => {
      logger.info("HTTP server closed.");
      await mongo.disconnect();
      logger.info("Graceful shutdown complete.");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

bootstrap().catch((error) => {
  logger.error(error, "Failed to start server:");
  process.exit(1);
});
