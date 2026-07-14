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

const protoPath = path.resolve(process.cwd(), "proto/user.proto");

const packageDef = loadSync(protoPath);

const proto = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

const controller = container.get<UserGrpcController>(TYPES.UserGrpcController);

export const server = new Server();

server.addService(proto.user.UserService.service, {
  GetUser: controller.GetUser,
});

export const startGrpcServer = async () => {
  const PORT = env.GRPC_PORT;

  return new Promise<void>((resolve, reject) => {
    const bindAddr = PORT.includes(":") ? PORT : `0.0.0.0:${PORT}`;
    console.log(`[DEBUG] GPRC_PORT value: "${PORT}"`);
    console.log(`[DEBUG] Final gRPC Bind Address: "${bindAddr}"`);
    server.bindAsync(
      bindAddr,
      ServerCredentials.createInsecure(),
      (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      }
    );
  });
};
