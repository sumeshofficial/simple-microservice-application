import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import path from "node:path";
import { ProtoGrpcType } from "./generated/user";
import { injectable } from "inversify";
import { IUserServiceClient } from "@application/ports/user-client.interface";
import { UserServiceClient } from "./generated/user/UserService";
import { env } from "@config/env.config";
import { container } from "@config/di/container";
import { TYPES } from "@config/di/types";

const protoPath = path.resolve(process.cwd(), "proto/user.proto");

const packageDef = loadSync(protoPath);

const proto = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

@injectable()
export class UserGrpcClient implements IUserServiceClient {
  private client: UserServiceClient;

  constructor() {
    this.client = new proto.user.UserService(
      env.USER_SERVICE_URL ?? "127.0.0.1:50051",
      credentials.createInsecure()
    );
  }
  getUserRole(userId: string): Promise<string | null> {
    return new Promise((resolve) => {
      this.client.GetUser({ userId }, (err, response) => {
        console.log(response)
        if (err) {
          return resolve(null);
        }

        resolve(response?.role || null);
      });
    });
  }
}