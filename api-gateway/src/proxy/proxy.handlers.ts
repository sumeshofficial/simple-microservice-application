import logger from "@config/logger.config";
import { ProxyErrorResponse } from "@custom-types/proxy-error-response.types";
import { HttpStatus } from "@utils/http-status";
import { HEADERS } from "@utils/types";
import { IncomingMessage } from "node:http";

export class ProxyHandlers {
  public static handleProxyError(err: Error, req: IncomingMessage, res: any) {
    logger.error(`[Proxy] Error on ${req.method} ${req.url}`, {
      error: err.message,
    });

    const errorResponse: ProxyErrorResponse = {
      message: "Downstream service unavailable",
      status: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
    };

    if (res.writeHead && !res.headersSent) {
      res.writeHead(HttpStatus.SERVICE_UNAVAILABLE, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(errorResponse));
    } else if (res.destroy) {
      res.destroy();
    }
  }

  public static handleProxyRequest(proxyReq: any, req: any): void {
    if (req.user) {
      proxyReq.setHeader(HEADERS.USER_ID, req.user.userId);
      proxyReq.setHeader(HEADERS.USER_ROLE, req.user.role);
    }

    const correlationId = (req as any).correlationId;
    if (correlationId) {
      proxyReq.setHeader("x-correlation-id", correlationId);
    }

    if (req.body && Object.keys(req.body).length > 0) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }

    logger.debug(`[Proxy] Forwarding to ${req.originalUrl}`, {
      userId: req.user?.userId,
    });
  }

  public static handleProxyResponse(
    _proxyRes: IncomingMessage,
    _req: IncomingMessage,
    _res: any
  ): void {
    // Header adjustments if needed
  }
}
