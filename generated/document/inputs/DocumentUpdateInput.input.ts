import * as NestJsGraphQL from "@nestjs/graphql";
import { EnumSTATUSFieldUpdateOperationsInput } from "../../common/inputs/EnumSTATUSFieldUpdateOperationsInput.input";
import { StringFieldUpdateOperationsInput } from "../../common/inputs/StringFieldUpdateOperationsInput.input";
import { UserUpdateOneWithoutDocumentsNestedInput } from "../../user/inputs/UserUpdateOneWithoutDocumentsNestedInput.input";

@NestJsGraphQL.InputType('DocumentUpdateInput', { isAbstract: true })
export class DocumentUpdateInput {
  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  url?: StringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => UserUpdateOneWithoutDocumentsNestedInput, { nullable: true })
  user?: UserUpdateOneWithoutDocumentsNestedInput | undefined;

  @NestJsGraphQL.Field(() => EnumSTATUSFieldUpdateOperationsInput, { nullable: true })
  status?: EnumSTATUSFieldUpdateOperationsInput | undefined;
}
