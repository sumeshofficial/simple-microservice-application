import { IUIDGenerator } from "@application/ports/services/uid-generator.service";
import { ulid } from "ulid";

export class UlIdGenerator implements IUIDGenerator {
  generate(): string {
    return ulid();
  }
}
