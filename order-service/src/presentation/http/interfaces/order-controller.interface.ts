import { Request, Response } from "express";

export interface IOrderController {
  createOrder(req: Request, res: Response): Promise<void>;
  getOrderById(req: Request, res: Response): Promise<void>;
  getOrdersByUserId(req: Request, res: Response): Promise<void>;
  updateOrderStatus(req: Request, res: Response): Promise<void>;
}
