import * as NestJsGraphQL from "@nestjs/graphql";
import { Role } from "../enums";
import { NestedEnumRoleFilter } from "./NestedEnumRoleFilter.input";

@NestJsGraphQL.InputType('EnumRoleFilter', { isAbstract: true })
export class EnumRoleFilter {
  @NestJsGraphQL.Field(() => Role, { nullable: true })
  equals?: "ADMIN" | "USER" | undefined;

  @NestJsGraphQL.Field(() => [Role], { nullable: true })
  in?: Array<"ADMIN" | "USER"> | undefined;

  @NestJsGraphQL.Field(() => [Role], { nullable: true })
  notIn?: Array<"ADMIN" | "USER"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumRoleFilter, { nullable: true })
  not?: NestedEnumRoleFilter | undefined;
}
