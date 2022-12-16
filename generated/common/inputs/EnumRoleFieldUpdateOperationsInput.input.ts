import * as NestJsGraphQL from "@nestjs/graphql";
import { Role } from "../enums";

@NestJsGraphQL.InputType('EnumRoleFieldUpdateOperationsInput', { isAbstract: true })
export class EnumRoleFieldUpdateOperationsInput {
  @NestJsGraphQL.Field(() => Role, { nullable: true })
  set?: "ADMIN" | "USER" | undefined;
}
