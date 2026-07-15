import { OrderResponseDTO } from "@application/dtos/order.dto";
import type { Order } from "@domain/entities/order.entity";

export class OrderMapper {
  static toDTO(order: Order): OrderResponseDTO {
    return {
      id: order.id,
      userId: order.userId,
      item: order.item,
      quantity: order.quantity,
      price: order.price,
      status: order.status,
      createdAt: order.created_at,
    };
  }

  static toDTOList(orders: Order[] | null): OrderResponseDTO[] {
    if (!orders) return [];
    return orders.map(OrderMapper.toDTO);
  }
}
