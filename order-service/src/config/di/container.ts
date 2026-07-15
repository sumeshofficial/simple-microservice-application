import { Container } from "inversify";
import { TYPES } from "./types";
import { CreateOrderUseCase } from "@application/use-cases/create-order.use-case";
import { GetOrderByIdUseCase } from "@application/use-cases/get-order-by-id.use-case.";
import { GetOrdersByUserIdUseCase } from "@application/use-cases/get-orders-by-user-id.use-case.";
import { UpdateOrderStatusUseCase } from "@application/use-cases/update-order-status.use-case";
import { OrderRepository } from "@infrastructure/repository/order.repository";
import { IdGenerator } from "@infrastructure/services/id-generator.service";
import { UserGrpcClient } from "@infrastructure/grpc/user.client";
import { OrderContoller } from "@presentation/http/controllers/order-controller";
import { AttachUserContextMiddleware } from "@presentation/http/middlewares/attach-user-context.middleware";
import { ValidationMiddleware } from "@presentation/http/middlewares/validation.middleware";
import { OrderRouter } from "@presentation/http/router/order.router";

const container = new Container();

// infra
container.bind(TYPES.OrderRepository).to(OrderRepository);
container.bind(TYPES.UIDService).to(IdGenerator)

// usecases
container.bind(TYPES.CreateOrder).to(CreateOrderUseCase);
container.bind(TYPES.GetOrderById).to(GetOrderByIdUseCase);
container.bind(TYPES.GetOrdersByUserId).to(GetOrdersByUserIdUseCase);
container.bind(TYPES.UpdateOrderStatus).to(UpdateOrderStatusUseCase);

// controllers
container.bind(TYPES.OrderController).to(OrderContoller);

// middlewares
container.bind(TYPES.AttactUserContextMiddleware).to(AttachUserContextMiddleware);
container.bind(TYPES.ValidationMiddleware).to(ValidationMiddleware);

// routes
container.bind(TYPES.OrderRoutes).to(OrderRouter);

// grpc client
container.bind(TYPES.UserServiceClient).to(UserGrpcClient);

export { container };