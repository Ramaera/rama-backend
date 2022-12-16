import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";

@NestJsGraphQL.InputType('DocumentMinOrderByAggregateInput', { isAbstract: true })
export class DocumentMinOrderByAggregateInput {
  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  id?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  title?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  url?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  userId?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  status?: "asc" | "desc" | undefined;
}
