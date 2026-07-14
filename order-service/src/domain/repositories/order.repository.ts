import { Order } from "@domain/entities/order.entity";

export interface IOrderRepository {
  save(user: Order): Promise<void>;

  findById(id: string): Promise<Order | null>;

  find(email: string): Promise<Order[]>;
}