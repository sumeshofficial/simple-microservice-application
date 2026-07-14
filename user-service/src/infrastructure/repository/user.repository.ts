import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { userModel } from "./models/user.model";
import { inject, injectable } from "inversify";
import { TYPES } from "@config/di/types";
import type { IUserMapper } from "./mapper/UserMapper.interface";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.UserMapper) private mapper: IUserMapper) {}

  async save(user: User): Promise<void> {
    const doc = this.mapper.toPersistence(user);
    await userModel.create(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await userModel.findOne({ email });
    if (!doc) return null;
    return this.mapper.toDomain(doc);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await userModel.findById(id);
     if (!doc) return null;
    return this.mapper.toDomain(doc);
  }
}
