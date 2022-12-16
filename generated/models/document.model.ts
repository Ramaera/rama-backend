import * as NestJsGraphQL from "@nestjs/graphql";
import { STATUS } from "../enums/STATUS.enum";
import { User } from "../models/user.model";

@NestJsGraphQL.ObjectType('Document', { isAbstract: true })
export class Document {
  @NestJsGraphQL.Field(() => String)
  id!: string;

  @NestJsGraphQL.Field(() => String)
  title!: string;

  @NestJsGraphQL.Field(() => String)
  url!: string;

  user?: User | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  userId?: string | null;

  @NestJsGraphQL.Field(() => STATUS)
  status!: "NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED";
}
