import { OrderResponseDTO } from "@application/dtos/order.dto";
import { OrderMapper } from "@application/mappers/order.mapper";
import {
  GetOrdersByUserIdRequest,
  IGetOrdersByUserIdUseCase,
} from "@application/ports/use-cases/get-orders-by-user-id.interface";
import { TYPES } from "@config/di/types";
import type { IOrderRepository } from "@domain/repositories/order.repository";
import { inject, injectable } from "inversify";

@injectable()
export class GetOrdersByUserIdUseCase implements IGetOrdersByUserIdUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository
  ) {}

  async execute(dto: GetOrdersByUserIdRequest): Promise<OrderResponseDTO[]> {
    const orders = await this.orderRepository.findByUserId(dto.userId);

    return OrderMapper.toDTOList(orders);
  }
}
