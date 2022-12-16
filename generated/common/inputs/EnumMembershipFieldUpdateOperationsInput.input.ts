import * as NestJsGraphQL from "@nestjs/graphql";
import { Membership } from "../enums";

@NestJsGraphQL.InputType('EnumMembershipFieldUpdateOperationsInput', { isAbstract: true })
export class EnumMembershipFieldUpdateOperationsInput {
  @NestJsGraphQL.Field(() => Membership, { nullable: true })
  set?: "BASIC" | "ADVANCE" | undefined;
}
