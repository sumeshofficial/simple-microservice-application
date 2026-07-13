import { Request, Response } from "express";

export interface IUserController {
  getMe(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;
}
