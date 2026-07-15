import { serviceConfigs } from "./proxy.config";
import { ProxyFactory } from "./proxy.factory";
import type { Application, NextFunction, Request, Response } from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import logger from "@config/logger.config";

export class ProxyService {
  public static setupProxy(app: Application): void {
    serviceConfigs.forEach((service) => {
      const proxyMiddleware = ProxyFactory.create(service);

      const pipeline: any[] = [];

      if (service.requireAuth) {
        pipeline.push((req: Request, res: Response, next: NextFunction) => {
          const isPublic = service.publicRoutes?.some((route) =>
            req.path.startsWith(route)
          );

          if (isPublic) {
            return next();
          }

          return authMiddleware(req, res, next);
        });
      }

      pipeline.push(proxyMiddleware);

      app.use(service.path, ...pipeline);

      logger.info(
        `[Proxy] Service Registered: ${service.name} mounted at ${service.path} (Auth: ${!!service.requireAuth})`
      );
    });
  }
}
