import * as NestJsGraphQL from "@nestjs/graphql";
import { KYC } from "../enums";
import { NestedEnumKYCFilter } from "./NestedEnumKYCFilter.input";
import { NestedIntFilter } from "./NestedIntFilter.input";

@NestJsGraphQL.InputType('NestedEnumKYCWithAggregatesFilter', { isAbstract: true })
export class NestedEnumKYCWithAggregatesFilter {
  @NestJsGraphQL.Field(() => KYC, { nullable: true })
  equals?: "NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED" | undefined;

  @NestJsGraphQL.Field(() => [KYC], { nullable: true })
  in?: Array<"NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED"> | undefined;

  @NestJsGraphQL.Field(() => [KYC], { nullable: true })
  notIn?: Array<"NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumKYCWithAggregatesFilter, { nullable: true })
  not?: NestedEnumKYCWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter | undefined;

  @NestJsGraphQL.Field(() => NestedEnumKYCFilter, { nullable: true })
  _min?: NestedEnumKYCFilter | undefined;

  @NestJsGraphQL.Field(() => NestedEnumKYCFilter, { nullable: true })
  _max?: NestedEnumKYCFilter | undefined;
}
