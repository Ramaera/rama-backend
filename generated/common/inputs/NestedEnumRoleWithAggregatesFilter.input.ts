import * as NestJsGraphQL from "@nestjs/graphql";
import { Role } from "../enums";
import { NestedEnumRoleFilter } from "./NestedEnumRoleFilter.input";
import { NestedIntFilter } from "./NestedIntFilter.input";

@NestJsGraphQL.InputType('NestedEnumRoleWithAggregatesFilter', { isAbstract: true })
export class NestedEnumRoleWithAggregatesFilter {
  @NestJsGraphQL.Field(() => Role, { nullable: true })
  equals?: "ADMIN" | "USER" | undefined;

  @NestJsGraphQL.Field(() => [Role], { nullable: true })
  in?: Array<"ADMIN" | "USER"> | undefined;

  @NestJsGraphQL.Field(() => [Role], { nullable: true })
  notIn?: Array<"ADMIN" | "USER"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumRoleWithAggregatesFilter, { nullable: true })
  not?: NestedEnumRoleWithAggregatesFilter | undefined;

  @NestJsGraphQL.Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter | undefined;

  @NestJsGraphQL.Field(() => NestedEnumRoleFilter, { nullable: true })
  _min?: NestedEnumRoleFilter | undefined;

  @NestJsGraphQL.Field(() => NestedEnumRoleFilter, { nullable: true })
  _max?: NestedEnumRoleFilter | undefined;
}
