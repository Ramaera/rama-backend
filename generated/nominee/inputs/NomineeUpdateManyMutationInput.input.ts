import * as NestJsGraphQL from "@nestjs/graphql";
import { NullableStringFieldUpdateOperationsInput } from "../../common/inputs/NullableStringFieldUpdateOperationsInput.input";
import { StringFieldUpdateOperationsInput } from "../../common/inputs/StringFieldUpdateOperationsInput.input";

@NestJsGraphQL.InputType('NomineeUpdateManyMutationInput', { isAbstract: true })
export class NomineeUpdateManyMutationInput {
  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  name?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  relationship?: StringFieldUpdateOperationsInput | undefined;
}
