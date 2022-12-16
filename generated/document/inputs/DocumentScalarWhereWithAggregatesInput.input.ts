import * as NestJsGraphQL from "@nestjs/graphql";
import { EnumSTATUSWithAggregatesFilter } from "../../common/inputs/EnumSTATUSWithAggregatesFilter.input";
import { StringNullableWithAggregatesFilter } from "../../common/inputs/StringNullableWithAggregatesFilter.input";
import { StringWithAggregatesFilter } from "../../common/inputs/StringWithAggregatesFilter.input";

@NestJsGraphQL.InputType('DocumentScalarWhereWithAggregatesInput', { isAbstract: true })
export class DocumentScalarWhereWithAggregatesInput {
  @NestJsGraphQL.Field(() => [DocumentScalarWhereWithAggregatesInput], { nullable: true })
  AND?: DocumentScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentScalarWhereWithAggregatesInput], { nullable: true })
  OR?: DocumentScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: DocumentScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringWithAggregatesFilter, { nullable: true })
  url?: StringWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  userId?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => EnumSTATUSWithAggregatesFilter, { nullable: true })
  status?: EnumSTATUSWithAggregatesFilter | undefined;
}
