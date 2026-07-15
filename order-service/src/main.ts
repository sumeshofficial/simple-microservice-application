import { container } from "@config/di/container";
import { TYPES } from "@config/di/types";
import { env } from "@config/env.config";
import { disconnectDB } from "@infrastructure/repository/prisma.client";
import { ROUTES } from "@presentation/http/constants/routes";
import { ErrorHandlerMiddleware } from "@presentation/http/middlewares/error-handler.middleware";
import { OrderRouter } from "@presentation/http/router/order.router";
import express from "express";

const app = express();

app.use(express.json());

const PORT = env.PORT;

const orderRoutes = container.get<OrderRouter>(TYPES.OrderRoutes);

app.use(ROUTES.ORDERS, orderRoutes.router);

app.use(ErrorHandlerMiddleware.handle);

const bootstrap = async () => {

  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await disconnectDB();
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