import { Role } from "@domain/value-objects/user-role";

export class User {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _email: string,
    private _passwordHash: string,
    private _role: Role
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get role(): Role {
    return this._role;
  }

  static create(data: {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role?: Role
  }) {
    return new User(
      data.id,
      data.name,
      data.email,
      data.passwordHash,
      data.role ?? Role.USER
    );
  }
}