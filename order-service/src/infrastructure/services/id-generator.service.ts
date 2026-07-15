import { IIdGenerator } from "@application/ports/services/id-generator.service";
import { injectable } from "inversify";
import { ulid } from "ulid";

@injectable()
export class IdGenerator implements IIdGenerator {
  generate(): string {
    return ulid();
  }
}
