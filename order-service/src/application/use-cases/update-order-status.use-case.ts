import { OrderResponseDTO } from "@application/dtos/order.dto";
import { OrderNotFoundException } from "@application/errors/OrderNotFoundException";
import { UnauthorizedException } from "@application/errors/UnauthorizedException";
import { OrderMapper } from "@application/mappers/order.mapper";
import type { IUserServiceClient } from "@application/ports/user-client.interface";
import {
  IUpdateOrderStatusUseCase,
  UpdateOrderStatusRequest,
} from "@application/ports/use-cases/update-order-status.interface";
import { TYPES } from "@config/di/types";
import type { IOrderRepository } from "@domain/repositories/order.repository";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateOrderStatusUseCase implements IUpdateOrderStatusUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository,
    @inject(TYPES.UserServiceClient)
    private userServiceClient: IUserServiceClient
  ) {}

  async execute(dto: UpdateOrderStatusRequest): Promise<OrderResponseDTO> {
    const role = await this.userServiceClient.getUserRole(dto.adminId);
    if (role !== "ADMIN") {
      throw new UnauthorizedException(
        "Only administrators can update order status"
      );
    }

    const order = await this.orderRepository.findById(dto.orderId);
    if (!order) {
      throw new OrderNotFoundException(
        `Order with id ${dto.orderId} not found`
      );
    }

    order.updateStatus(dto.newStatus);

    const updatedOrder = await this.orderRepository.save(order);

    return OrderMapper.toDTO(updatedOrder);
  }
}
