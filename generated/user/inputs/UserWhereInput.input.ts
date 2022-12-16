import * as NestJsGraphQL from "@nestjs/graphql";
import { DateTimeFilter } from "../../common/inputs/DateTimeFilter.input";
import { EnumKYCFilter } from "../../common/inputs/EnumKYCFilter.input";
import { EnumMembershipFilter } from "../../common/inputs/EnumMembershipFilter.input";
import { EnumRoleFilter } from "../../common/inputs/EnumRoleFilter.input";
import { StringFilter } from "../../common/inputs/StringFilter.input";
import { StringNullableFilter } from "../../common/inputs/StringNullableFilter.input";
import { DocumentListRelationFilter } from "../../document/inputs/DocumentListRelationFilter.input";
import { NomineeRelationFilter } from "../../nominee/inputs/NomineeRelationFilter.input";

@NestJsGraphQL.InputType('UserWhereInput', { isAbstract: true })
export class UserWhereInput {
  @NestJsGraphQL.Field(() => [UserWhereInput], { nullable: true })
  AND?: UserWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => [UserWhereInput], { nullable: true })
  OR?: UserWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => [UserWhereInput], { nullable: true })
  NOT?: UserWhereInput[] | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  id?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter | undefined;

  @NestJsGraphQL.Field(() => DateTimeFilter, { nullable: true })
  updatedAt?: DateTimeFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  email?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringFilter, { nullable: true })
  password?: StringFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  name?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  father_or_husband_name?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  mobile_number?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  alternate_mobile_number?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => DocumentListRelationFilter, { nullable: true })
  documents?: DocumentListRelationFilter | undefined;

  @NestJsGraphQL.Field(() => NomineeRelationFilter, { nullable: true })
  nominee?: NomineeRelationFilter | undefined;

  @NestJsGraphQL.Field(() => EnumKYCFilter, { nullable: true })
  kyc?: EnumKYCFilter | undefined;

  @NestJsGraphQL.Field(() => EnumRoleFilter, { nullable: true })
  role?: EnumRoleFilter | undefined;

  @NestJsGraphQL.Field(() => EnumMembershipFilter, { nullable: true })
  membership?: EnumMembershipFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  date_of_birth?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  demat_account?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  private_key?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  pw_id?: StringNullableFilter | undefined;

  @NestJsGraphQL.Field(() => StringNullableFilter, { nullable: true })
  rm_id?: StringNullableFilter | undefined;
}
