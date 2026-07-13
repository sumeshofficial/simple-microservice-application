import { GetUserDto } from "@application/dtos/get-user.dto";
import { IUseCase } from "./use-case.interface";
import { UserDTO } from "@domain/entities/user.entity";

export interface IGetUserUseCase extends IUseCase<GetUserDto, UserDTO> {}
