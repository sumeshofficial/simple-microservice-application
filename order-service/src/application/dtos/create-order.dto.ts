import { z } from "zod";

export const CreateOrderDtoSchema = z.object({
  userId: z.string().min(3).max(50),
  item: z.string(),
  quantity: z.number(),
  amount: z.number(),
});

export type CreateOrderDto = z.infer<typeof CreateOrderDtoSchema>;
