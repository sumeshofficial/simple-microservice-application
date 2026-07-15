import {
  OrderResponseDTO,
} from "@application/dtos/order.dto";
import { OrderMapper } from "@application/mappers/order.mapper";
import type { IIdGenerator } from "@application/ports/services/id-generator.service";
import { ICreateOrderUseCase, OrderCreateRequestDTO } from "@application/ports/use-cases/create-order.interface";
import { TYPES } from "@config/di/types";
import { Order } from "@domain/entities/order.entity";
import type { IOrderRepository } from "@domain/repositories/order.repository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository,
    @inject(TYPES.UIDService) private idGenerator: IIdGenerator
  ) {}
  async execute(dto: OrderCreateRequestDTO): Promise<OrderResponseDTO> {
    const id = this.idGenerator.generate();
    const order = Order.create({
      id,
      userId: dto.userId,
      item: dto.item,
      quantity: dto.quantity,
      price: dto.price,
    });

    const createdOrder = await this.orderRepository.save(order);

    return OrderMapper.toDTO(createdOrder);
  }
}
