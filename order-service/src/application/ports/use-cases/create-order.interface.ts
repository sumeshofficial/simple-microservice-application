import { CreateOrderDto } from "@application/dtos/create-order.dto";
import { IUseCase } from "./use-case.interface";
import { OrderDTO } from "@domain/entities/order.entity";

export interface ICreateOrderUseCase extends IUseCase<
  CreateOrderDto,
  OrderDTO
> {}
