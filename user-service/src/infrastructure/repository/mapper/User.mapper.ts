import { User } from "@domain/entities/user.entity";
import {
  HydratedUserDocument,
  LeanUserDocument,
} from "@infrastructure/repository/models/user.model";
import { injectable } from "inversify";
import { IUserMapper } from "./UserMapper.interface";

@injectable()
export class UserMapper implements IUserMapper {
  toDomain(raw: HydratedUserDocument): User {
    return new User(
      raw._id.toString(),
      raw.name,
      raw.email,
      raw.passwordHash,
      raw.role
    );
  }

  toPersistence(user: User): LeanUserDocument {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
    };
  }
}
