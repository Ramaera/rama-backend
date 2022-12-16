import * as NestJsGraphQL from "@nestjs/graphql";
import { DateTimeWithAggregatesFilter } from "../../common/inputs/DateTimeWithAggregatesFilter.input";
import { EnumKYCWithAggregatesFilter } from "../../common/inputs/EnumKYCWithAggregatesFilter.input";
import { EnumMembershipWithAggregatesFilter } from "../../common/inputs/EnumMembershipWithAggregatesFilter.input";
import { EnumRoleWithAggregatesFilter } from "../../common/inputs/EnumRoleWithAggregatesFilter.input";
import { StringNullableWithAggregatesFilter } from "../../common/inputs/StringNullableWithAggregatesFilter.input";
import { StringWithAggregatesFilter } from "../../common/inputs/StringWithAggregatesFilter.input";

@NestJsGraphQL.InputType('UserScalarWhereWithAggregatesInput', { isAbstract: true })
export class UserScalarWhereWithAggregatesInput {
  @NestJsGraphQL.Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  AND?: UserScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  OR?: UserScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => [UserScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: UserScalarWhereWithAggregatesInput[] | undefined;

  @NestJsGraphQL.Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updatedAt?: DateTimeWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  email?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringWithAggregatesFilter, { nullable: true })
  password?: StringWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  name?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  father_or_husband_name?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  mobile_number?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  alternate_mobile_number?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => EnumKYCWithAggregatesFilter, { nullable: true })
  kyc?: EnumKYCWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => EnumRoleWithAggregatesFilter, { nullable: true })
  role?: EnumRoleWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => EnumMembershipWithAggregatesFilter, { nullable: true })
  membership?: EnumMembershipWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  date_of_birth?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  demat_account?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  private_key?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  pw_id?: StringNullableWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableWithAggregatesFilter, { nullable: true })
  rm_id?: StringNullableWithAggregatesFilter | undefined;
}
