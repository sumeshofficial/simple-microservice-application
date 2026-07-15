import { env } from "@config/env.config";
import { ServiceConfig } from "@custom-types/service-config.types";

const DEFAULT_TIMEOUT = env.DEFAULT_TIMEOUT || 5000;

export const serviceConfigs: ServiceConfig[] = [
  {
    path: "/api/v1/auth",
    url: env.USER_SERVICE_URL,
    pathRewrite: { "^/api/v1/auth/": "" },
    name: "auth-service",
    timeout: Number(DEFAULT_TIMEOUT),
    requireAuth: true,
    publicRoutes: ["/register", "/login"],
  },
  {
    path: "/api/v1/users",
    url: env.USER_SERVICE_URL,
    pathRewrite: { "^/api/v1/users/": "" },
    name: "user-service",
    timeout: Number(DEFAULT_TIMEOUT),
    requireAuth: true,
    publicRoutes: [],
  },
  {
    path: "/api/v1/orders",
    url: env.ORDER_SERVICE_URL,
    pathRewrite: { "^/api/v1/orders/": "" },
    name: "order-service",
    timeout: Number(DEFAULT_TIMEOUT),
    requireAuth: true,
    publicRoutes: [],
  }
];
