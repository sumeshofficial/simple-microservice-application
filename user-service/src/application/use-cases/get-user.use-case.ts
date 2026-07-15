import { GetUserDto } from "@application/dtos/get-user.dto";
import { UserResponseDTO } from "@application/dtos/user.dto";
import { UserMapper } from "@application/mappers/user.mapper";
import { IGetUserUseCase } from "@application/ports/use-cases/get-user.use-case.interface";
import { TYPES } from "@config/di/types";
import { UserNotFoundException } from "@domain/exceptions/DomainException";
import type { IUserRepository } from "@domain/repositories/user.repository";
import { inject, injectable } from "inversify";

@injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}
  async execute(dto: GetUserDto): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    return UserMapper.toDTO(user)
  }
}
