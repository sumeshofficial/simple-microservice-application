import { Router } from "express";
import { IAuthController } from "../interfaces/auth-controller.interface";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { RegisterUserDtoSchema } from "@application/dtos/register.dto";
import { LoginUserDtoSchema } from "@application/dtos/login.dto";

export class AuthRouter {
  static create(authController: IAuthController) {
    const router = Router();

    router.post(
      "/register",
      ValidationMiddleware.validate(RegisterUserDtoSchema),
      authController.register
    );

    router.post(
      "/login",
      ValidationMiddleware.validate(LoginUserDtoSchema),
      authController.login
    );

    return router;
  }
}
