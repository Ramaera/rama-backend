import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";

@NestJsGraphQL.InputType('NomineeMinOrderByAggregateInput', { isAbstract: true })
export class NomineeMinOrderByAggregateInput {
  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  userPw_id?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  name?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  relationship?: "asc" | "desc" | undefined;
}
