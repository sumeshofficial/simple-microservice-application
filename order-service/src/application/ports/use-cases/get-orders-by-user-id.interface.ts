import {
  OrderResponseDTO,
} from "@application/dtos/order.dto";
import { IUseCase } from "./use-case.interface";

export type GetOrdersByUserIdRequest = {
    userId: string
}

export interface IGetOrdersByUserIdUseCase extends IUseCase<
  GetOrdersByUserIdRequest,
  OrderResponseDTO[]
> {}
