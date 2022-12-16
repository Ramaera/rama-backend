import * as NestJsGraphQL from "@nestjs/graphql";
import { STATUS } from "../enums";

@NestJsGraphQL.InputType('NestedEnumSTATUSFilter', { isAbstract: true })
export class NestedEnumSTATUSFilter {
  @NestJsGraphQL.Field(() => STATUS, { nullable: true })
  equals?: "NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED" | undefined;

  @NestJsGraphQL.Field(() => [STATUS], { nullable: true })
  in?: Array<"NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED"> | undefined;

  @NestJsGraphQL.Field(() => [STATUS], { nullable: true })
  notIn?: Array<"NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumSTATUSFilter, { nullable: true })
  not?: NestedEnumSTATUSFilter | undefined;
}
