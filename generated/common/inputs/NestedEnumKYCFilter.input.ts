import * as NestJsGraphQL from "@nestjs/graphql";
import { KYC } from "../enums";

@NestJsGraphQL.InputType('NestedEnumKYCFilter', { isAbstract: true })
export class NestedEnumKYCFilter {
  @NestJsGraphQL.Field(() => KYC, { nullable: true })
  equals?: "NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED" | undefined;

  @NestJsGraphQL.Field(() => [KYC], { nullable: true })
  in?: Array<"NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED"> | undefined;

  @NestJsGraphQL.Field(() => [KYC], { nullable: true })
  notIn?: Array<"NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumKYCFilter, { nullable: true })
  not?: NestedEnumKYCFilter | undefined;
}
