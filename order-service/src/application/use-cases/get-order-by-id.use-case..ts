import { OrderResponseDTO } from "@application/dtos/order.dto";
import { OrderMapper } from "@application/mappers/order.mapper";
import {
  GetOrderByIdRequest,
  IGetOrderByIdUseCase,
} from "@application/ports/use-cases/get-order-by-id.interface";
import { TYPES } from "@config/di/types";
import { OrderNotFoundException } from "@application/errors/OrderNotFoundException";
import type { IOrderRepository } from "@domain/repositories/order.repository";
import { inject, injectable } from "inversify";

@injectable()
export class GetOrderByIdUseCase implements IGetOrderByIdUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository
  ) {}
  async execute(dto: GetOrderByIdRequest): Promise<OrderResponseDTO> {
    const order = await this.orderRepository.findById(dto.id);

    if (!order) {
      throw new OrderNotFoundException(`Order with id ${dto.id} not found`);
    }

    return OrderMapper.toDTO(order);
  }
}
