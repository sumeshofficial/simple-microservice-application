import {
  OrderResponseDTO,
} from "@application/dtos/order.dto";
import { IUseCase } from "./use-case.interface";

export type GetOrderByIdRequest = {
    id: string
}

export interface IGetOrderByIdUseCase extends IUseCase<
  GetOrderByIdRequest,
  OrderResponseDTO
> {}
