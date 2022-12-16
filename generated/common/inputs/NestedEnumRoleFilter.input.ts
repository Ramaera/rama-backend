import * as NestJsGraphQL from "@nestjs/graphql";
import { Role } from "../enums";

@NestJsGraphQL.InputType('NestedEnumRoleFilter', { isAbstract: true })
export class NestedEnumRoleFilter {
  @NestJsGraphQL.Field(() => Role, { nullable: true })
  equals?: "ADMIN" | "USER" | undefined;

  @NestJsGraphQL.Field(() => [Role], { nullable: true })
  in?: Array<"ADMIN" | "USER"> | undefined;

  @NestJsGraphQL.Field(() => [Role], { nullable: true })
  notIn?: Array<"ADMIN" | "USER"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumRoleFilter, { nullable: true })
  not?: NestedEnumRoleFilter | undefined;
}
