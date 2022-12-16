import * as NestJsGraphQL from "@nestjs/graphql";
import { StringFilter } from "../../common/inputs/StringFilter.input";
import { StringNullableFilter } from "../../common/inputs/StringNullableFilter.input";
import { UserRelationFilter } from "../../user/inputs/UserRelationFilter.input";

@NestJsGraphQL.InputType('NomineeWhereInput', { isAbstract: true })
export class NomineeWhereInput {
  @NestJsGraphQL.Field(() => [NomineeWhereInput], { nullable: true })
  AND?: NomineeWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => [NomineeWhereInput], { nullable: true })
  OR?: NomineeWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => [NomineeWhereInput], { nullable: true })
  NOT?: NomineeWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => UserRelationFilter, { nullable: true })
  user?: UserRelationFilter | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  userPw_id?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  name?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  relationship?: StringFilter | undefined;
}
