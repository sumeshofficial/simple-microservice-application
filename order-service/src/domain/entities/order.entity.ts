import { OrderStateTransitionException } from "@domain/exceptions/OrderStateTransitionException";
import { OrderStatus } from "@domain/value-objects/order-status";

export class Order {
  constructor(
    private readonly _id: string,
    private _userId: string,
    private _item: string,
    private _quantity: number,
    private _price: number,
    private _status: OrderStatus,
    private _created_at: Date
  ) {}

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get item(): string {
    return this._item;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get created_at(): Date {
    return this._created_at;
  }

  static create(data: {
    id: string;
    userId: string;
    item: string;
    quantity: number;
    price: number;
  }) {
    return new Order(
      data.id,
      data.userId,
      data.item,
      data.quantity,
      data.price,
      OrderStatus.PENDING,
      new Date()
    );
  }

  private static readonly validTransitions: Record<OrderStatus, OrderStatus[]> =
    {
      [OrderStatus.PENDING]: [OrderStatus.PROCESSING],
      [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
    };

  updateStatus(newStatus: OrderStatus) {
    if (this.status === newStatus) return;

    const allowed = Order.validTransitions[this.status];

    if (!allowed?.includes(newStatus)) {
      throw new OrderStateTransitionException(
        `Invalid status transition from ${this.status} to ${newStatus}`
      );
    }

    this._status = newStatus;
  }
}