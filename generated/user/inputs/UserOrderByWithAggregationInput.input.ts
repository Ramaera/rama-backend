import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";
import { UserCountOrderByAggregateInput } from "../../user/inputs/UserCountOrderByAggregateInput.input";
import { UserMaxOrderByAggregateInput } from "../../user/inputs/UserMaxOrderByAggregateInput.input";
import { UserMinOrderByAggregateInput } from "../../user/inputs/UserMinOrderByAggregateInput.input";

@NestJsGraphQL.InputType('UserOrderByWithAggregationInput', { isAbstract: true })
export class UserOrderByWithAggregationInput {
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

  @NestJsGraphQL.Field(() => UserCountOrderByAggregateInput, { nullable: true })
  _count?: UserCountOrderByAggregateInput | undefined;

  @NestJsGraphQL.Field(() => UserMaxOrderByAggregateInput, { nullable: true })
  _max?: UserMaxOrderByAggregateInput | undefined;

  @NestJsGraphQL.Field(() => UserMinOrderByAggregateInput, { nullable: true })
  _min?: UserMinOrderByAggregateInput | undefined;
}
