import { GetUserDto } from "@application/dtos/get-user.dto";
import { IGetUserUseCase } from "@application/ports/use-cases/get-user.use-case.interface";
import { TYPES } from "@config/di/types";
import { UserDTO } from "@domain/entities/user.entity";
import { UserNotFoundException } from "@domain/exceptions/DomainException";
import type { IUserRepository } from "@domain/repositories/user.repository";
import { inject, injectable } from "inversify";

@injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}
  async execute(dto: GetUserDto): Promise<UserDTO> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user.toPrimitives();
  }
}
