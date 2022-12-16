import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";
import { DocumentCountOrderByAggregateInput } from "../../document/inputs/DocumentCountOrderByAggregateInput.input";
import { DocumentMaxOrderByAggregateInput } from "../../document/inputs/DocumentMaxOrderByAggregateInput.input";
import { DocumentMinOrderByAggregateInput } from "../../document/inputs/DocumentMinOrderByAggregateInput.input";

@NestJsGraphQL.InputType('DocumentOrderByWithAggregationInput', { isAbstract: true })
export class DocumentOrderByWithAggregationInput {
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

  @NestJsGraphQL.Field(() => DocumentCountOrderByAggregateInput, { nullable: true })
  _count?: DocumentCountOrderByAggregateInput | undefined;

  @NestJsGraphQL.Field(() => DocumentMaxOrderByAggregateInput, { nullable: true })
  _max?: DocumentMaxOrderByAggregateInput | undefined;

  @NestJsGraphQL.Field(() => DocumentMinOrderByAggregateInput, { nullable: true })
  _min?: DocumentMinOrderByAggregateInput | undefined;
}
