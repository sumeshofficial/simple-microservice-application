import { RegisterUserDto } from "@application/dtos/register.dto";
import type { IPassworHasher } from "@application/ports/services/password-hasher.service";
import type {
  AuthTokenPayload,
  ITokenGenerator,
} from "@application/ports/services/token-generator.service";
import type { IUIDGenerator } from "@application/ports/services/uid-generator.service";
import {
  IRegisterUserUseCase,
  RegisterOutputDto,
} from "@application/ports/use-cases/register-user.use-case.interface";
import { TYPES } from "@config/di/types";
import { User } from "@domain/entities/user.entity";
import { UserAlreadyExistsEception } from "@domain/exceptions/DomainException";
import type { IUserRepository } from "@domain/repositories/user.repository";
import { inject, injectable } from "inversify";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.PasswordService) private passwordHasher: IPassworHasher,
    @inject(TYPES.TokenService) private tokenGenerator: ITokenGenerator,
    @inject(TYPES.UIDService) private uidGenerator: IUIDGenerator
  ) {}

  async execute(dto: RegisterUserDto): Promise<RegisterOutputDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new UserAlreadyExistsEception(dto.email);
    }

    const passwordHash = await this.passwordHasher.hash(dto.password);

    const userId = this.uidGenerator.generate();
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
