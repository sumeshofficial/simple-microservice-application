import { randomUUID } from "crypto";

export class User {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _email: string,
    private _passwordHash: string
  ) {}

  get id(): string {
    return this._id;
  }

  get fullname(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get passwordHashValue(): string {
    return this._passwordHash;
  }

  static create(data: { name: string; email: string; passwordHash: string }) {
    return new User(randomUUID(), data.name, data.email, data.passwordHash);
  }

  toPrimitives() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
    };
  }
}

export type UserDTO = ReturnType<typeof User.prototype.toPrimitives>;
