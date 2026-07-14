import { Request, Response } from "express";
import { IAuthController } from "../interfaces/auth-controller.interface";
import { RegisterUserDto } from "@application/dtos/register.dto";
import type { IRegisterUserUseCase } from "@application/ports/use-cases/register-user.use-case.interface";
import type { ILoginUserUseCase } from "@application/ports/use-cases/login-user.use-case.interface";
import { HttpStatus } from "../constants/http-status";
import { ResponseMessages } from "../constants/response-messages";
import { LoginUserDto } from "@application/dtos/login.dto";
import { inject, injectable } from "inversify";
import { TYPES } from "@config/di/types";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.RegisterUser) private registerUserUseCase: IRegisterUserUseCase,
    @inject(TYPES.LoginUser) private loginUserUseCase: ILoginUserUseCase
  ) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const dto: RegisterUserDto = req.body;
    const result = await this.registerUserUseCase.execute(dto);

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: ResponseMessages.USER_REGISTERED_SUCCESS,
      data: result,
    });
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const dto: LoginUserDto = req.body;
    const result = await this.loginUserUseCase.execute(dto);

    res.status(HttpStatus.OK).json({
      success: true,
      message: ResponseMessages.USER_LOGIN_SUCCESS,
      data: result,
    });
  };
}
