import { RegisterUserDto } from "@application/dtos/register.dto";
import { IPassworHasher } from "@application/ports/services/password-hasher.service";
import {
  AuthTokenPayload,
  ITokenGenerator,
} from "@application/ports/services/token-generator.service";
import {
  IRegisterUserUseCase,
  RegisterOutputDto,
} from "@application/ports/use-cases/register-user.use-case.interface";
import { User } from "@domain/entities/user.entity";
import { UserAlreadyExistsEception } from "@domain/exceptions/DomainException";
import { IUserRepository } from "@domain/repositories/user.repository";
import { ulid } from "ulid";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPassworHasher,
    private tokenGenerator: ITokenGenerator
  ) {}

  async execute(dto: RegisterUserDto): Promise<RegisterOutputDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new UserAlreadyExistsEception(dto.email);
    }

    const passwordHash = await this.passwordHasher.hash(dto.password);

    const userId = ulid();
    const user = User.create({
      id: userId,
      name: dto.name,
      email: dto.email,
      passwordHash,
    });

    await this.userRepository.save(user);

    const tokenPayload: AuthTokenPayload = {
      userId: user.id,
      name: user.name,
      role: user.role,
    };

    const accessToken =
      await this.tokenGenerator.generateAccessToken(tokenPayload);

    return { accessToken };
  }
}
