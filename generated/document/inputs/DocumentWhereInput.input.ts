import * as NestJsGraphQL from "@nestjs/graphql";
import { EnumSTATUSFilter } from "../../common/inputs/EnumSTATUSFilter.input";
import { StringFilter } from "../../common/inputs/StringFilter.input";
import { StringNullableFilter } from "../../common/inputs/StringNullableFilter.input";
import { UserRelationFilter } from "../../user/inputs/UserRelationFilter.input";

@NestJsGraphQL.InputType('DocumentWhereInput', { isAbstract: true })
export class DocumentWhereInput {
  @NestJsGraphQL.Field(() => [DocumentWhereInput], { nullable: true })
  AND?: DocumentWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentWhereInput], { nullable: true })
  OR?: DocumentWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentWhereInput], { nullable: true })
  NOT?: DocumentWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  id?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  title?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  url?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => UserRelationFilter, { nullable: true })
  user?: UserRelationFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  userId?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => EnumSTATUSFilter, { nullable: true })
  status?: EnumSTATUSFilter | undefined;
}
