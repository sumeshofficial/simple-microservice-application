import { User } from "@domain/entities/user.entity";
import { HydratedUserDocument, LeanUserDocument } from "../models/user.model";
import { IMapper } from "./Mapper.interface";

export interface IUserMapper
  extends IMapper<
    User,
    HydratedUserDocument,
    LeanUserDocument
  > {}