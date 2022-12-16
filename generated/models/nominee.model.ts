import * as NestJsGraphQL from "@nestjs/graphql";
import { User } from "../models/user.model";

@NestJsGraphQL.ObjectType('Nominee', { isAbstract: true })
export class Nominee {
  user?: User | null;

  @NestJsGraphQL.Field(() => String)
  userPw_id!: string;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name?: string | null;

  @NestJsGraphQL.Field(() => String)
  relationship!: string;
}
