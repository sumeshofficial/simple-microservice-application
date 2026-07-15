import { Order } from "@domain/entities/order.entity";
import { IOrderRepository } from "@domain/repositories/order.repository";
import { prisma } from "./prisma.client";
import { injectable } from "inversify";

@injectable()
export class OrderRepository implements IOrderRepository {
  async save(order: Order): Promise<Order> {
    const data = await prisma.order.upsert({
      where: {
        id: order.id,
      },
      update: {
        status: order.status,
      },
      create: {
        id: order.id,
        userId: order.userId,
        item: order.item,
        quantity: order.quantity,
        price: order.price,
        status: order.status,
        createdAt: order.created_at,
      },
    });

    return new Order(
      data.id,
      data.userId,
      data.item,
      data.quantity,
      data.price,
      data.status,
      data.createdAt
    );
  }

  async findById(id: string): Promise<Order | null> {
    const data = await prisma.order.findUnique({ where: { id } });

    if (!data) return null;

    return new Order(
      data.id,
      data.userId,
      data.item,
      data.quantity,
      data.price,
      data.status,
      data.createdAt
    );
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const data = await prisma.order.findMany({
      where: { userId },
    });

    return data.map(
      (o) =>
        new Order(
          o.id,
          o.userId,
          o.item,
          o.quantity,
          o.price,
          o.status,
          o.createdAt
        )
    );
  }
}
