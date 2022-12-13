import * as NestJsGraphQL from "@nestjs/graphql";
import { KYC } from "../enums";
import { NestedEnumKYCFilter } from "./NestedEnumKYCFilter.input";

@NestJsGraphQL.InputType('EnumKYCFilter', { isAbstract: true })
export class EnumKYCFilter {
  @NestJsGraphQL.Field(() => KYC, { nullable: true })
  equals?: "NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED" | undefined;

  @NestJsGraphQL.Field(() => [KYC], { nullable: true })
  in?: Array<"NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED"> | undefined;

  @NestJsGraphQL.Field(() => [KYC], { nullable: true })
  notIn?: Array<"NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED"> | undefined;

  @NestJsGraphQL.Field(() => NestedEnumKYCFilter, { nullable: true })
  not?: NestedEnumKYCFilter | undefined;
}
