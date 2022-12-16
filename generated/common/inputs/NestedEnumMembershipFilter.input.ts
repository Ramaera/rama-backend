import * as NestJsGraphQL from "@nestjs/graphql";
import { Membership } from "../enums";

@NestJsGraphQL.InputType('NestedEnumMembershipFilter', { isAbstract: true })
export class NestedEnumMembershipFilter {
  @NestJsGraphQL.Field(() => Membership, { nullable: true })
  equals?: "BASIC" | "ADVANCE" | undefined;

  @NestJsGraphQL.Field(() => [Membership], { nullable: true })
  in?: Array<"BASIC" | "ADVANCE"> | undefined;

  @NestJsGraphQL.Field(() => [Membership], { nullable: true })
  notIn?: Array<"BASIC" | "ADVANCE"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumMembershipFilter, { nullable: true })
  not?: NestedEnumMembershipFilter | undefined;
}
