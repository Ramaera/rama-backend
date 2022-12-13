import * as NestJsGraphQL from "@nestjs/graphql";
import { EnumSTATUSFilter } from "../../common/inputs/EnumSTATUSFilter.input";
import { StringFilter } from "../../common/inputs/StringFilter.input";
import { StringNullableFilter } from "../../common/inputs/StringNullableFilter.input";

@NestJsGraphQL.InputType('DocumentScalarWhereInput', { isAbstract: true })
export class DocumentScalarWhereInput {
  @NestJsGraphQL.Field(() => [DocumentScalarWhereInput], { nullable: true })
  AND?: DocumentScalarWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentScalarWhereInput], { nullable: true })
  OR?: DocumentScalarWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentScalarWhereInput], { nullable: true })
  NOT?: DocumentScalarWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  id?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  title?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  url?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  userId?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => EnumSTATUSFilter, { nullable: true })
  status?: EnumSTATUSFilter | undefined;
}
