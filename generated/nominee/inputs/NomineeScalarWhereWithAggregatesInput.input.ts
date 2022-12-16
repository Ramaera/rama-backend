import * as NestJsGraphQL from "@nestjs/graphql";
import { StringNullableWithAggregatesFilter } from "../../common/inputs/StringNullableWithAggregatesFilter.input";
import { StringWithAggregatesFilter } from "../../common/inputs/StringWithAggregatesFilter.input";

@NestJsGraphQL.InputType('NomineeScalarWhereWithAggregatesInput', { isAbstract: true })
export class NomineeScalarWhereWithAggregatesInput {
  @NestJsGraphQL.Field(() => [NomineeScalarWhereWithAggregatesInput], { nullable: true })
  AND?: NomineeScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => [NomineeScalarWhereWithAggregatesInput], { nullable: true })
  OR?: NomineeScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => [NomineeScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: NomineeScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => StringWithAggregatesFilter, { nullable: true })
  userPw_id?: StringWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  name?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringWithAggregatesFilter, { nullable: true })
  relationship?: StringWithAggregatesFilter | undefined;
}
