import { IPassworHasher } from "@application/ports/services/password-hasher.service";
import argon2 from "argon2";

export class Argon2PassworHasher implements IPassworHasher {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64 MB
      timeCost: 3, // 3 iterations
      parallelism: 4, // 4 parallel threads
    });
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return argon2.verify(hashedPassword, password);
    } catch (error) {
      return false;
    }
  }
}
