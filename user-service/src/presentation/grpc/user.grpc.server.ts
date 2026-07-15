import { container } from "@config/di/container";
import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import path from "node:path";
import type { UserGrpcController } from "./controllers/user.grpc.conrollers";
import { TYPES } from "@config/di/types";
import { ProtoGrpcType } from "./generated/user";
import { env } from "@config/env.config";
import { randomUUID } from "node:crypto";
import { tracingStorage } from "@shared/tracing/tracing-context";
import { logger } from "@shared/logger/logger";

const protoPath = path.resolve(process.cwd(), "proto/user.proto");

const packageDef = loadSync(protoPath);

const proto = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

const controller = container.get<UserGrpcController>(TYPES.UserGrpcController);

export const server = new Server();

server.addService(proto.user.UserService.service, {
  GetUser: (call: any, callback: any) => {
    const correlationId =
      call.metadata.get("x-correlation-id")[0] || randomUUID();
    tracingStorage.run({ correlationId }, () => {
      controller.GetUser(call, callback);
    });
  },
});

export const startGrpcServer = async () => {
  const PORT = env.GRPC_PORT;

  return new Promise<void>((resolve, reject) => {
    const bindAddr = PORT.includes(":") ? PORT : `0.0.0.0:${PORT}`;
    logger.info(`[DEBUG] GPRC_PORT value: "${PORT}"`);
    logger.info(`[DEBUG] Final gRPC Bind Address: "${bindAddr}"`);
    server.bindAsync(
      bindAddr,
      ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          logger.error(err, "Failed to bind gRPC server");
          return reject(err);
        }
        logger.info(`gRPC server bound on ${port}`);
        resolve();
      }
    );
  });
};
