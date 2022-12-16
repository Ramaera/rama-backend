import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";
import { DocumentOrderByRelationAggregateInput } from "../../document/inputs/DocumentOrderByRelationAggregateInput.input";
import { NomineeOrderByWithRelationInput } from "../../nominee/inputs/NomineeOrderByWithRelationInput.input";

@NestJsGraphQL.InputType('UserOrderByWithRelationInput', { isAbstract: true })
export class UserOrderByWithRelationInput {
  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  id?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  createdAt?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  updatedAt?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  email?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  password?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  name?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  father_or_husband_name?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  mobile_number?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  alternate_mobile_number?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => DocumentOrderByRelationAggregateInput, { nullable: true })
  documents?: DocumentOrderByRelationAggregateInput | undefined;

  @NestJsGraphQL.Field(() => NomineeOrderByWithRelationInput, { nullable: true })
  nominee?: NomineeOrderByWithRelationInput | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  kyc?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  role?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  membership?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  date_of_birth?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  demat_account?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  private_key?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  pw_id?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  rm_id?: "asc" | "desc" | undefined;
}
