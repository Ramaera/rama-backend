import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";

@NestJsGraphQL.InputType('NomineeMaxOrderByAggregateInput', { isAbstract: true })
export class NomineeMaxOrderByAggregateInput {
  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  userPw_id?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  name?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  relationship?: "asc" | "desc" | undefined;
}
