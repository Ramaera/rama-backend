import * as NestJsGraphQL from "@nestjs/graphql";
import { STATUS } from "../enums";
import { NestedEnumSTATUSFilter } from "./NestedEnumSTATUSFilter.input";
import { NestedIntFilter } from "./NestedIntFilter.input";

@NestJsGraphQL.InputType('NestedEnumSTATUSWithAggregatesFilter', { isAbstract: true })
export class NestedEnumSTATUSWithAggregatesFilter {
  @NestJsGraphQL.Field(() => STATUS, { nullable: true })
  equals?: "NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED" | undefined;

  @NestJsGraphQL.Field(() => [STATUS], { nullable: true })
  in?: Array<"NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED"> | undefined;

  @NestJsGraphQL.Field(() => [STATUS], { nullable: true })
  notIn?: Array<"NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumSTATUSWithAggregatesFilter, { nullable: true })
  not?: NestedEnumSTATUSWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter | undefined;

  @NestJsGraphQL.Field(() => NestedEnumSTATUSFilter, { nullable: true })
  _min?: NestedEnumSTATUSFilter | undefined;

  @NestJsGraphQL.Field(() => NestedEnumSTATUSFilter, { nullable: true })
  _max?: NestedEnumSTATUSFilter | undefined;
}
