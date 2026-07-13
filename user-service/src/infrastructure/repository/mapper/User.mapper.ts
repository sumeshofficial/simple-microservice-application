import { User } from "@domain/entities/user.entity";
import {
  HydratedUserDocument,
  LeanUserDocument,
} from "@infrastructure/repository/models/user.model";

export class UserMapper {
  toDomain(raw: HydratedUserDocument): User {
    return new User(
      raw._id.toString(),
      raw.name,
      raw.email,
      raw.passwordHash,
      raw.role
    );
  }

  toMongoDocument(user: User): LeanUserDocument {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
    };
  }
}