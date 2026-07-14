import { env } from "@config/env.config";
import { MongoDatabase } from "@infrastructure/repository/DatabaseInstance";
import { ErrorHandlerMiddleware } from "@presentation/http/middlewares/error-handler.middleware";
import { AuthRouter } from "@presentation/http/router/auth.router";
import { UserRouter } from "@presentation/http/router/user.router";
import "reflect-metadata";
import express from "express";
import { container } from "@config/di/container";
import { TYPES } from "@config/di/types";
import { ROUTES } from "@presentation/http/constants/routes";
import {
  server as grpcServer,
  startGrpcServer,
} from "@presentation/grpc/user.grpc.server";

const app = express();

app.use(express.json());

const authRoutes = container.get<AuthRouter>(TYPES.AuthRoutes);
const userRoutes = container.get<UserRouter>(TYPES.UserRoutes);

app.use(ROUTES.AUTH, authRoutes.router);
app.use(ROUTES.USERS, userRoutes.router);

app.use(ErrorHandlerMiddleware.handle);

const PORT = env.PORT;

const bootstrap = async () => {
  const mongo = MongoDatabase.getInstance();
  await mongo.connect();
  await startGrpcServer();

  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });

  const shutdown = async () => {
    grpcServer.tryShutdown((err) => {
      console.log(err);
    });
    server.close(async () => {
      await mongo.disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

bootstrap().catch((error) => {
  console.error("Failed to bootstrap application", error);
  process.exit(1);
});
