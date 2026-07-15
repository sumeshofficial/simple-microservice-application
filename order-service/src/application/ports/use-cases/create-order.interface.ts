import {
  OrderResponseDTO,
} from "@application/dtos/order.dto";
import { IUseCase } from "./use-case.interface";

export type OrderCreateRequestDTO = {
  userId: string;
  item: string;
  quantity: number;
  price: number;
};


export interface ICreateOrderUseCase extends IUseCase<
  OrderCreateRequestDTO,
  OrderResponseDTO
> {}
