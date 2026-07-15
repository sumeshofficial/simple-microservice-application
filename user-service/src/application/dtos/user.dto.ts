import { Role } from "@domain/value-objects/user-role";

export type UserResponseDTO = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
