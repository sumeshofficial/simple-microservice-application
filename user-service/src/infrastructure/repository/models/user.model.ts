import { User } from "@domain/entities/user.entity";
import { Document, HydratedDocument, model, Schema, Types } from "mongoose";

export interface IUserDocument extends Omit<User, "id">, Document<string> {
  _id: string;
}

const UserSchema = new Schema<IUserDocument>({
  _id: { type: String, required: true, auto: false },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String },
});

export const userModel = model<IUserDocument>("User", UserSchema);

export type HydratedUserDocument = HydratedDocument<IUserDocument>;

export type LeanUserDocument = Pick<
  IUserDocument,
  "_id" | "name" | "email" | "passwordHash" | "role"
>;
