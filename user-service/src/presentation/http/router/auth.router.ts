import { Router } from "express";
import type { IAuthController } from "../interfaces/auth-controller.interface";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { RegisterUserDtoSchema } from "@application/dtos/register.dto";
import { LoginUserDtoSchema } from "@application/dtos/login.dto";
import { inject, injectable } from "inversify";
import { TYPES } from "@config/di/types";

@injectable()
export class AuthRouter {
  public router: Router;

  constructor(
    @inject(TYPES.AuthController) private authController: IAuthController,
    @inject(TYPES.ValidationMiddleware) private validationMiddleware: ValidationMiddleware
  ) {
    this.router = Router();

    this.init()
  }
  
  private init() {
    this.router.post(
      "/register",
      this.validationMiddleware.validate(RegisterUserDtoSchema),
      this.authController.register
    );

    this.router.post(
      "/login",
      this.validationMiddleware.validate(LoginUserDtoSchema),
      this.authController.login
    );
  }
}
