import { z } from "zod";

export const LoginUserDtoSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
