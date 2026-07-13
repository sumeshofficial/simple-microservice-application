import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { UserMapper } from "./mapper/User.mapper";
import { userModel } from "./models/user.model";

export class UserRepository implements IUserRepository {
  constructor(private mapper: UserMapper) {}

  async save(user: User): Promise<void> {
    const doc = this.mapper.toMongoDocument(user);
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
