import type { IGetUserUseCase } from "@application/ports/use-cases/get-user.use-case.interface";
import { TYPES } from "@config/di/types";
import { UserNotFoundException } from "@domain/exceptions/DomainException";
import { status } from "@grpc/grpc-js";
import { inject, injectable } from "inversify";
import { UserServiceHandlers } from "../generated/user/UserService";

@injectable()
export class UserGrpcController {
  constructor(@inject(TYPES.GetUser) private getUserUseCase: IGetUserUseCase) {}

  GetUser: UserServiceHandlers['GetUser'] = async (call, callback) => {
    try {
      const { userId } = call.request;
      const user = await this.getUserUseCase.execute({ userId });

      if (!user) {
        return callback({
          code: status.NOT_FOUND,
          message: "User not found",
        });
      }

      callback(null, user);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return callback({
          code: status.NOT_FOUND,
          message: error.message,
        });
      }
      callback({
        code: status.INTERNAL,
        message: "Internal server error",
      });
    }
  };
}
