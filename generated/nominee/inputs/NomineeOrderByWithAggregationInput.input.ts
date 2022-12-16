import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";
import { NomineeCountOrderByAggregateInput } from "../../nominee/inputs/NomineeCountOrderByAggregateInput.input";
import { NomineeMaxOrderByAggregateInput } from "../../nominee/inputs/NomineeMaxOrderByAggregateInput.input";
import { NomineeMinOrderByAggregateInput } from "../../nominee/inputs/NomineeMinOrderByAggregateInput.input";

@NestJsGraphQL.InputType('NomineeOrderByWithAggregationInput', { isAbstract: true })
export class NomineeOrderByWithAggregationInput {
  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  userPw_id?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  name?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  relationship?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => NomineeCountOrderByAggregateInput, { nullable: true })
  _count?: NomineeCountOrderByAggregateInput | undefined;

  @NestJsGraphQL.Field(() => NomineeMaxOrderByAggregateInput, { nullable: true })
  _max?: NomineeMaxOrderByAggregateInput | undefined;

  @NestJsGraphQL.Field(() => NomineeMinOrderByAggregateInput, { nullable: true })
  _min?: NomineeMinOrderByAggregateInput | undefined;
}
