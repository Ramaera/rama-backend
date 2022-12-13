import * as NestJsGraphQL from "@nestjs/graphql";
import { STATUS } from "../enums";

@NestJsGraphQL.InputType('EnumSTATUSFieldUpdateOperationsInput', { isAbstract: true })
export class EnumSTATUSFieldUpdateOperationsInput {
  @NestJsGraphQL.Field(() => STATUS, { nullable: true })
  set?: "NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED" | undefined;
}
