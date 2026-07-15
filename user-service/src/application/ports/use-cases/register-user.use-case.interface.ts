import { RegisterUserDto } from "@application/dtos/register.dto";
import { IUseCase } from "./use-case.interface";

export interface RegisterOutputDto {
  accessToken: string;
}

export interface IRegisterUserUseCase extends IUseCase<
  RegisterUserDto,
  RegisterOutputDto
> {}
