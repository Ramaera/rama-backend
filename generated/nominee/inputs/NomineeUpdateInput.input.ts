import * as NestJsGraphQL from "@nestjs/graphql";
import { NullableStringFieldUpdateOperationsInput } from "../../common/inputs/NullableStringFieldUpdateOperationsInput.input";
import { StringFieldUpdateOperationsInput } from "../../common/inputs/StringFieldUpdateOperationsInput.input";
import { UserUpdateOneWithoutNomineeNestedInput } from "../../user/inputs/UserUpdateOneWithoutNomineeNestedInput.input";

@NestJsGraphQL.InputType('NomineeUpdateInput', { isAbstract: true })
export class NomineeUpdateInput {
  @NestJsGraphQL.Field(() => UserUpdateOneWithoutNomineeNestedInput, { nullable: true })
  user?: UserUpdateOneWithoutNomineeNestedInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  name?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  relationship?: StringFieldUpdateOperationsInput | undefined;
}
