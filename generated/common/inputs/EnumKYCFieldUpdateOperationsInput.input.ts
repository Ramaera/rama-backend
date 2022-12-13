import * as NestJsGraphQL from "@nestjs/graphql";
import { KYC } from "../enums";

@NestJsGraphQL.InputType('EnumKYCFieldUpdateOperationsInput', { isAbstract: true })
export class EnumKYCFieldUpdateOperationsInput {
  @NestJsGraphQL.Field(() => KYC, { nullable: true })
  set?: "NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED" | undefined;
}
