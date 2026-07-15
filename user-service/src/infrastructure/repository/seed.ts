import { Container } from "inversify";
import { TYPES } from "@config/di/types";
import { RegisterUserUseCase } from "@application/use-cases/register-user.use-case";
import { Role } from "@domain/value-objects/user-role";

export const seedAdmin = async (container: Container) => {
  try {
    const registerUser = container.get<RegisterUserUseCase>(TYPES.RegisterUser);

    const adminEmail = "admin@email.com";
    const adminPassword = "AdminPassword123!";
    const adminName = "Default Administrator";

    try {
      await registerUser.execute({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: Role.ADMIN
    });
    } catch (error: any) {
      if (error.message?.includes("already exists")) {
        console.log("[Seed] Admin user already exists, skipping seed.");
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(error)
  }
};