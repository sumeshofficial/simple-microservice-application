import { Request, Response } from "express";
import { IGetUserUseCase } from "@application/ports/use-cases/get-user.use-case.interface";
import { IUserController } from "../interfaces/user-controller.interface";
import { ResponseMessages } from "../constants/response-messages";
import { HttpStatus } from "../constants/http-status";
import { UnauthorizedError } from "@application/errors/UnauthorizedError";

export class UserController implements IUserController {
  constructor(private getUserUseCase: IGetUserUseCase) {}

  getMe = async (req: Request, res: Response): Promise<void> => {
    const user = req.user;

    if (!user?.id) {
      throw new UnauthorizedError();
    }

    const result = await this.getUserUseCase.execute({ userId: user.id });

    res.status(HttpStatus.OK).json({
      success: true,
      message: ResponseMessages.USER_FETCHED_SUCCESS,
      data: result,
    });
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId as string;

    const result = await this.getUserUseCase.execute({ userId });

    res.status(HttpStatus.OK).json({
      success: true,
      message: ResponseMessages.USER_FETCHED_SUCCESS,
      data: result,
    });
  };
}
