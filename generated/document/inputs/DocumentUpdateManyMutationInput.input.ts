import * as NestJsGraphQL from "@nestjs/graphql";
import { EnumSTATUSFieldUpdateOperationsInput } from "../../common/inputs/EnumSTATUSFieldUpdateOperationsInput.input";
import { StringFieldUpdateOperationsInput } from "../../common/inputs/StringFieldUpdateOperationsInput.input";

@NestJsGraphQL.InputType('DocumentUpdateManyMutationInput', { isAbstract: true })
export class DocumentUpdateManyMutationInput {
  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  url?: StringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => EnumSTATUSFieldUpdateOperationsInput, { nullable: true })
  status?: EnumSTATUSFieldUpdateOperationsInput | undefined;
}
