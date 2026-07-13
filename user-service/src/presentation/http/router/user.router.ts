import { Router } from "express";
import { IUserController } from "../interfaces/user-controller.interface";
import { attachUserContext } from "../middlewares/attach-user-context.middleware";
import { authorize } from "../middlewares/auth.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { GetUserSchema } from "@application/dtos/get-user.dto";

export class UserRouter {
  static create(userController: IUserController) {
    const router = Router();

    router.get("/me", attachUserContext, userController.getMe);

    router.get(
      "/:userId",
      attachUserContext,
      authorize("ADMIN"),
      ValidationMiddleware.validate(GetUserSchema, 'params'),
      userController.getUserById
    );

    return router;
  }
}
