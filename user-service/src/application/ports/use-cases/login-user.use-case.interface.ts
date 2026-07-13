import { LoginUserDto } from "@application/dtos/login.dto";
import { IUseCase } from "./use-case.interface";
import { Role } from "@domain/value-objects/user-role";

export interface LoginOutputDto {
    accessToken: string,
    userId: string,
    role: Role
}

export interface ILoginUserUseCase extends IUseCase<LoginUserDto, LoginOutputDto> {}
