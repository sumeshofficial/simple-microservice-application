import { OrderStatus } from "@domain/value-objects/order-status";

export class Order {
  constructor(
    private readonly _id: string,
    private _userId: string,
    private _item: string,
    private _quantity: number,
    private _amount: number,
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

  get amount(): number {
    return this._amount;
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
    amount: number;
  }) {
    return new Order(
      data.id,
      data.userId,
      data.item,
      data.quantity,
      data.amount,
      OrderStatus.PENDING,
      new Date()
    );
  }

  toPrimitives() {
    return {
      id: this._id,
      userId: this._userId,
      item: this._item,
      quantity: this._quantity,
      amount: this._amount,
      status: this._status,
      created_at: this._created_at,
    };
  }
}

export type OrderDTO = ReturnType<typeof Order.prototype.toPrimitives>;
