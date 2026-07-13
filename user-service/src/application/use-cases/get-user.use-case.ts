import { GetUserDto } from "@application/dtos/get-user.dto";
import { IGetUserUseCase } from "@application/ports/use-cases/get-user.use-case.interface";
import { UserDTO } from "@domain/entities/user.entity";
import { UserNotFoundException } from "@domain/exceptions/DomainException";
import { IUserRepository } from "@domain/repositories/user.repository";

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(dto: GetUserDto): Promise<UserDTO> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user.toPrimitives();
  }
}
