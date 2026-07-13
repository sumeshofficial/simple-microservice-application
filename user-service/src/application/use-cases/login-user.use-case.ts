import { LoginUserDto } from "@application/dtos/login.dto";
import { IPassworHasher } from "@application/ports/services/password-hasher.service";
import {
  AuthTokenPayload,
  ITokenGenerator,
} from "@application/ports/services/token-generator.service";
import {
  ILoginUserUseCase,
  LoginOutputDto,
} from "@application/ports/use-cases/login-user.use-case.interface";
import {
  InvalidCredentialsException,
  UserNotFoundException,
} from "@domain/exceptions/DomainException";
import { IUserRepository } from "@domain/repositories/user.repository";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenGenerator: ITokenGenerator,
    private passwordHasher: IPassworHasher
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
