export const API = {
  PREFIX: "/api",
  VERSION: "/v1",
} as const;

export const ROUTES = {
  ORDERS: `${API.PREFIX}${API.VERSION}/orders`,
} as const;