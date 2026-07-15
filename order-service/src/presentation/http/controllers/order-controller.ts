import { Request, Response } from "express";
import type { IOrderController } from "../interfaces/order-controller.interface";
import { UnauthorizedException } from "@application/errors/UnauthorizedException";
import { AppErrorStatusCodes } from "@application/errors/APP_ERROR_STATUS_CODES";
import { inject, injectable } from "inversify";
import { TYPES } from "@config/di/types";
import type { ICreateOrderUseCase } from "@application/ports/use-cases/create-order.interface";
import type { IGetOrderByIdUseCase } from "@application/ports/use-cases/get-order-by-id.interface";
import type { IGetOrdersByUserIdUseCase } from "@application/ports/use-cases/get-orders-by-user-id.interface";
import type {
  IUpdateOrderStatusUseCase,
  UpdateOrderStatusRequest,
} from "@application/ports/use-cases/update-order-status.interface";
import { HttpStatus } from "../constants/http-status";
import { ResponseMessages } from "../constants/response-messages";
import { OrderNotFoundException } from "@application/errors/OrderNotFoundException";

@injectable()
export class OrderContoller implements IOrderController {
  constructor(
    @inject(TYPES.CreateOrder) private createOrderUseCase: ICreateOrderUseCase,
    @inject(TYPES.GetOrderById)
    private getOrderByIdUseCase: IGetOrderByIdUseCase,
    @inject(TYPES.GetOrdersByUserId)
    private getOrdersByUserIdUseCase: IGetOrdersByUserIdUseCase,
    @inject(TYPES.UpdateOrderStatus)
    private updateOrderStatusUseCase: IUpdateOrderStatusUseCase
  ) {}
  createOrder = async (req: Request, res: Response): Promise<void> => {
    const { item, quantity, price } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException(
        "Unauthorized",
        AppErrorStatusCodes.UNAUTHORIZED
      );
    }

    const order = await this.createOrderUseCase.execute({
      userId,
      item,
      quantity,
      price,
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: ResponseMessages.ORDER_CREATED_SUCCESS,
      data: order,
    });
  };

  getOrderById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const order = await this.getOrderByIdUseCase.execute({ id: id as string });
    if (!order) {
      throw new OrderNotFoundException();
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: ResponseMessages.ORDER_FETCHED_SUCCESS,
      data: order,
    });
  };

  getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException(
        "Unauthorized",
        AppErrorStatusCodes.UNAUTHORIZED
      );
    }

    const orders = await this.getOrdersByUserIdUseCase.execute({ userId });
    res.status(HttpStatus.OK).json({
      success: true,
      message: ResponseMessages.ORDERS_FETCHED_SUCCESS,
      data: orders,
    });
  };

  updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;
    const adminId = req.user?.id;

    if (!adminId) {
      throw new UnauthorizedException(
        "Unauthorized",
        AppErrorStatusCodes.UNAUTHORIZED
      );
    }

    const dto: UpdateOrderStatusRequest = {
      orderId: id as string,
      newStatus: status,
      adminId,
    };
    const order = await this.updateOrderStatusUseCase.execute(dto);

    res.status(HttpStatus.OK).json({
      success: true,
      message: ResponseMessages.ORDER_STATUS_UPDATED_SUCCESS,
      data: order,
    });
  };
}
