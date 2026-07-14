import { Router } from "express";
import type { IUserController } from "../interfaces/user-controller.interface";
import { AttachUserContextMiddleware } from "../middlewares/attach-user-context.middleware";
import { RoleMiddleware } from "../middlewares/role.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { GetUserSchema } from "@application/dtos/get-user.dto";
import { inject, injectable } from "inversify";
import { TYPES } from "@config/di/types";

@injectable()
export class UserRouter {
  public router: Router
  constructor(
    @inject(TYPES.UserController) private userController: IUserController,
    @inject(TYPES.AttactUserContextMiddleware) private attachUserContextMiddleware: AttachUserContextMiddleware,
    @inject(TYPES.RoleMiddleware) private roleMiddleware: RoleMiddleware,
    @inject(TYPES.ValidationMiddleware) private validationMiddleware: ValidationMiddleware,
  ) {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/me", this.attachUserContextMiddleware.handle, this.userController.getMe);

    this.router.get(
      "/:userId",
      this.attachUserContextMiddleware.handle,
      this.roleMiddleware.handle("ADMIN"),
      this.validationMiddleware.validate(GetUserSchema, 'params'),
      this.userController.getUserById
    );
  }
}
