import { LoginUserDto } from "@application/dtos/login.dto";
import type { IPassworHasher } from "@application/ports/services/password-hasher.service";
import type {
  AuthTokenPayload,
  ITokenGenerator,
} from "@application/ports/services/token-generator.service";
import {
  ILoginUserUseCase,
  LoginOutputDto,
} from "@application/ports/use-cases/login-user.use-case.interface";
import { TYPES } from "@config/di/types";
import {
  InvalidCredentialsException,
  UserNotFoundException,
} from "@domain/exceptions/DomainException";
import type { IUserRepository } from "@domain/repositories/user.repository";
import { inject, injectable } from "inversify";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.TokenService) private tokenGenerator: ITokenGenerator,
    @inject(TYPES.PasswordService) private passwordHasher: IPassworHasher
  ) {}
  async execute(dto: LoginUserDto): Promise<LoginOutputDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await this.passwordHasher.compare(
      dto.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const tokenPayload: AuthTokenPayload = {
      userId: user.id,
      name: user.name,
      role: user.role,
    };

    const accessToken =
      await this.tokenGenerator.generateAccessToken(tokenPayload);

    return { accessToken, userId: user.id, role: user.role };
  }
}
