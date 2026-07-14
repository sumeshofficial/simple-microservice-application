export const OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  COMPLETED: "COMPLETED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
