export const OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
