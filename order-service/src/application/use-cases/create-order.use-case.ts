import { CreateOrderDto } from "@application/dtos/create-order.dto";
import { IIdGenerator } from "@application/ports/services/id-generator.service";
import { ICreateOrderUseCase } from "@application/ports/use-cases/create-order.interface";
import { Order, OrderDTO } from "@domain/entities/order.entity";
import { IOrderRepository } from "@domain/repositories/order.repository"

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private idGenerator: IIdGenerator
  ) {}
  async execute(dto: CreateOrderDto): Promise<OrderDTO> {
    const id = this.idGenerator.generate();
    const order = Order.create({
      id,
      userId: dto.userId,
      item: dto.item,
      quantity: dto.quantity,
      amount: dto.amount,
    });

    await this.orderRepository.save(order);

    return order.toPrimitives();
  }
}
