import { Role } from "@domain/value-objects/user-role";
import { z } from "zod";

export const RegisterUserDtoSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
  role: z.enum(Role).optional(),
});

export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;
