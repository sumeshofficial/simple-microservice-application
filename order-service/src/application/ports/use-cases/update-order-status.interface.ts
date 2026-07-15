import { OrderResponseDTO } from "@application/dtos/order.dto";
import { IUseCase } from "./use-case.interface";
import { OrderStatus } from "@domain/value-objects/order-status";

export type UpdateOrderStatusRequest = {
  orderId: string;
  newStatus: OrderStatus;
  adminId: string;
};

export interface IUpdateOrderStatusUseCase extends IUseCase<
  UpdateOrderStatusRequest,
  OrderResponseDTO
> {}
