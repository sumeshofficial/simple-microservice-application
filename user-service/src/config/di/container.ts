import { Container } from "inversify";
import { TYPES } from "./types";
import { UserRepository } from "@infrastructure/repository/user.repository";
import { Argon2PassworHasher } from "@infrastructure/services/argon2-password-hasher.service";
import { TokenGenerator } from "@infrastructure/services/token-generator.service";
import { RegisterUserUseCase } from "@application/use-cases/register-user.use-case";
import { LoginUserUseCase } from "@application/use-cases/login-user.use-case";
import { GetUserUseCase } from "@application/use-cases/get-user.use-case";
import { AuthController } from "@presentation/http/controllers/auth-controller";
import { UserController } from "@presentation/http/controllers/user-controller";
import { AttachUserContextMiddleware } from "@presentation/http/middlewares/attach-user-context.middleware";
import { RoleMiddleware } from "@presentation/http/middlewares/role.middleware";
import { ValidationMiddleware } from "@presentation/http/middlewares/validation.middleware";
import { AuthRouter } from "@presentation/http/router/auth.router";
import { UserRouter } from "@presentation/http/router/user.router";
import { UlIdGenerator } from "@infrastructure/services/ulid-generator.service";
import { UserMapper } from "@infrastructure/repository/mapper/User.mapper";
import { UserGrpcController } from "@presentation/grpc/controllers/user.grpc.conrollers";

const container = new Container();

// infra
container.bind(TYPES.UserRepository).to(UserRepository);
container.bind(TYPES.PasswordService).to(Argon2PassworHasher);
container.bind(TYPES.TokenService).to(TokenGenerator);
container.bind(TYPES.UIDService).to(UlIdGenerator);
container.bind(TYPES.UserMapper).to(UserMapper);

// use-cases
container.bind(TYPES.RegisterUser).to(RegisterUserUseCase);
container.bind(TYPES.LoginUser).to(LoginUserUseCase);
container.bind(TYPES.GetUser).to(GetUserUseCase);

// controller
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.UserController).to(UserController);

// middlewares
container.bind(TYPES.AttactUserContextMiddleware).to(AttachUserContextMiddleware)
container.bind(TYPES.RoleMiddleware).to(RoleMiddleware)
container.bind(TYPES.ValidationMiddleware).to(ValidationMiddleware)

// routes
container.bind(TYPES.AuthRoutes).to(AuthRouter);
container.bind(TYPES.UserRoutes).to(UserRouter);

// grpc
container.bind(TYPES.UserGrpcController).to(UserGrpcController);

export { container };