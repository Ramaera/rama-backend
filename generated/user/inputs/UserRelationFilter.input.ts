import * as NestJsGraphQL from "@nestjs/graphql";
import { UserWhereInput } from "../../user/inputs/UserWhereInput.input";

@NestJsGraphQL.InputType('UserRelationFilter', { isAbstract: true })
export class UserRelationFilter {
  @NestJsGraphQL.Field(() => UserWhereInput, { nullable: true })
  is?: UserWhereInput | undefined;

  @NestJsGraphQL.Field(() => UserWhereInput, { nullable: true })
  isNot?: UserWhereInput | undefined;
}
