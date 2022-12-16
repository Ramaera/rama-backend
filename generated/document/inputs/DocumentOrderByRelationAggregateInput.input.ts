import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";

@NestJsGraphQL.InputType('DocumentOrderByRelationAggregateInput', { isAbstract: true })
export class DocumentOrderByRelationAggregateInput {
  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  _count?: "asc" | "desc" | undefined;
}
