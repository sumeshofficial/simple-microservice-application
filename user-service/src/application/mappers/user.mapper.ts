import { UserResponseDTO } from "@application/dtos/user.dto";
import { User } from "@domain/entities/user.entity";

export class UserMapper {
  static toDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
}
