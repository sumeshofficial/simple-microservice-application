import { env } from "@config/env.config";
import logger from "@config/logger.config";
import { ServiceConfig } from "@custom-types/service-config.types";
import { ProxyHandlers } from "./proxy.handlers";
import {
  type Options as ProxyOptions,
  createProxyMiddleware,
} from "http-proxy-middleware";

export class ProxyFactory {
  public static create(service: ServiceConfig) {
    const options: ProxyOptions = {
      target: service.url,
      changeOrigin: true,
      pathRewrite: service.pathRewrite,
      timeout: Number(env.DEFAULT_TIMEOUT) || Number(service.timeout),
      logger: logger,
      on: {
        error: ProxyHandlers.handleProxyError,
        proxyReq: ProxyHandlers.handleProxyRequest,
        proxyRes: ProxyHandlers.handleProxyResponse,
      },
    };

    return createProxyMiddleware(options);
  }
}
