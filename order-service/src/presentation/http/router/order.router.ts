import { Router } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@config/di/types";
import type { IOrderController } from "../interfaces/order-controller.interface";
import type { AttachUserContextMiddleware } from "../middlewares/attach-user-context.middleware";
import type { ValidationMiddleware } from "../middlewares/validation.middleware";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../validators/order.validator";

@injectable()
export class OrderRouter {
  public router: Router;

  constructor(
    @inject(TYPES.OrderController) private orderController: IOrderController,
    @inject(TYPES.AttactUserContextMiddleware)
    private attachUserContextMiddleware: AttachUserContextMiddleware,
    @inject(TYPES.ValidationMiddleware)
    private validationMiddleware: ValidationMiddleware
  ) {
    this.router = Router();

    this.init();
  }

  private init() {
    this.router.post(
      "/",
      this.attachUserContextMiddleware.handle,
      this.validationMiddleware.validate(createOrderSchema),
      this.orderController.createOrder
    );

    this.router.get(
      "/:id",
      this.attachUserContextMiddleware.handle,
      this.orderController.getOrderById
    );

    this.router.get(
      "/",
      this.attachUserContextMiddleware.handle,
      this.orderController.getOrdersByUserId
    );

    this.router.patch(
      "/:id",
      this.attachUserContextMiddleware.handle,
      this.validationMiddleware.validate(updateOrderStatusSchema),
      this.orderController.updateOrderStatus
    );
  }
}
