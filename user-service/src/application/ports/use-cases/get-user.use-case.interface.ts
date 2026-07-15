import { GetUserDto } from "@application/dtos/get-user.dto";
import { IUseCase } from "./use-case.interface";
import { UserResponseDTO } from "@application/dtos/user.dto";

export interface IGetUserUseCase extends IUseCase<GetUserDto, UserResponseDTO> {}
