import * as NestJsGraphQL from "@nestjs/graphql";
import { Membership } from "../enums";
import { NestedEnumMembershipFilter } from "./NestedEnumMembershipFilter.input";
import { NestedEnumMembershipWithAggregatesFilter } from "./NestedEnumMembershipWithAggregatesFilter.input";
import { NestedIntFilter } from "./NestedIntFilter.input";

@NestJsGraphQL.InputType('EnumMembershipWithAggregatesFilter', { isAbstract: true })
export class EnumMembershipWithAggregatesFilter {
  @NestJsGraphQL.Field(() => Membership, { nullable: true })
  equals?: "BASIC" | "ADVANCE" | undefined;

  @NestJsGraphQL.Field(() => [Membership], { nullable: true })
  in?: Array<"BASIC" | "ADVANCE"> | undefined;

  @NestJsGraphQL.Field(() => [Membership], { nullable: true })
  notIn?: Array<"BASIC" | "ADVANCE"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumMembershipWithAggregatesFilter, { nullable: true })
  not?: NestedEnumMembershipWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter | undefined;

  @NestJsGraphQL.Field(() => NestedEnumMembershipFilter, { nullable: true })
  _min?: NestedEnumMembershipFilter | undefined;

  @NestJsGraphQL.Field(() => NestedEnumMembershipFilter, { nullable: true })
  _max?: NestedEnumMembershipFilter | undefined;
}
