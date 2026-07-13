import { GetUserUseCase } from "@application/use-cases/get-user.use-case";
import { LoginUserUseCase } from "@application/use-cases/login-user.use-case";
import { RegisterUserUseCase } from "@application/use-cases/register-user.use-case";
import { env } from "@config/env.config";
import { MongoDatabase } from "@infrastructure/repository/DatabaseInstance";
import { UserMapper } from "@infrastructure/repository/mapper/User.mapper";
import { UserRepository } from "@infrastructure/repository/user.repository";
import { Argon2PassworHasher } from "@infrastructure/services/argon2-password-hasher.service";
import { TokenGenerator } from "@infrastructure/services/token-generator.service";
import { AuthController } from "@presentation/http/controllers/auth-controller";
import { UserController } from "@presentation/http/controllers/user-controller";
import { ErrorHandlerMiddleware } from "@presentation/http/middlewares/error-handler.middleware";
import { AuthRouter } from "@presentation/http/router/auth.router";
import { UserRouter } from "@presentation/http/router/user.router";
import express from "express";

const app = express();

app.use(express.json());

const argon2PasswordHasher = new Argon2PassworHasher();
const tokenGenerator = new TokenGenerator();

const mapper = new UserMapper();
const userRepository = new UserRepository(mapper);

const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  argon2PasswordHasher,
  tokenGenerator
);
const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  tokenGenerator,
  argon2PasswordHasher
);
const getMeUseCase = new GetUserUseCase(userRepository);

const authController = new AuthController(
  registerUserUseCase,
  loginUserUseCase
);

const userController = new UserController(getMeUseCase);

app.use("/api/auth", AuthRouter.create(authController));
app.use("/api/users", UserRouter.create(userController));

app.use(ErrorHandlerMiddleware.handle);

const PORT = env.PORT || 3001;

const bootstrap = async () => {
  const mongo = MongoDatabase.getInstance();
  await mongo.connect();

  const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${env.PORT}`);
  });

  const shutdown = async () => {
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
