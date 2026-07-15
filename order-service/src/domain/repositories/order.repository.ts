import { Order } from "@domain/entities/order.entity";

export interface IOrderRepository {
  save(order: Order): Promise<Order>;

  findByUserId(userId: string): Promise<Order[]>;

  findById(id: string): Promise<Order | null>;
}
