import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";

@NestJsGraphQL.InputType('NomineeCountOrderByAggregateInput', { isAbstract: true })
export class NomineeCountOrderByAggregateInput {
  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  userPw_id?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  name?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  relationship?: "asc" | "desc" | undefined;
}
