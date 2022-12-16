import * as NestJsGraphQL from "@nestjs/graphql";
import { DateTimeFieldUpdateOperationsInput } from "../../common/inputs/DateTimeFieldUpdateOperationsInput.input";
import { EnumKYCFieldUpdateOperationsInput } from "../../common/inputs/EnumKYCFieldUpdateOperationsInput.input";
import { EnumMembershipFieldUpdateOperationsInput } from "../../common/inputs/EnumMembershipFieldUpdateOperationsInput.input";
import { EnumRoleFieldUpdateOperationsInput } from "../../common/inputs/EnumRoleFieldUpdateOperationsInput.input";
import { NullableStringFieldUpdateOperationsInput } from "../../common/inputs/NullableStringFieldUpdateOperationsInput.input";
import { StringFieldUpdateOperationsInput } from "../../common/inputs/StringFieldUpdateOperationsInput.input";
import { DocumentUpdateManyWithoutUserNestedInput } from "../../document/inputs/DocumentUpdateManyWithoutUserNestedInput.input";

@NestJsGraphQL.InputType('UserUpdateWithoutNomineeInput', { isAbstract: true })
export class UserUpdateWithoutNomineeInput {
  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  email?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  password?: StringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  name?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  father_or_husband_name?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  mobile_number?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  alternate_mobile_number?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => DocumentUpdateManyWithoutUserNestedInput, { nullable: true })
  documents?: DocumentUpdateManyWithoutUserNestedInput | undefined;

  @NestJsGraphQL.Field(() => EnumKYCFieldUpdateOperationsInput, { nullable: true })
  kyc?: EnumKYCFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => EnumRoleFieldUpdateOperationsInput, { nullable: true })
  role?: EnumRoleFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => EnumMembershipFieldUpdateOperationsInput, { nullable: true })
  membership?: EnumMembershipFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  date_of_birth?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  demat_account?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  private_key?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  pw_id?: NullableStringFieldUpdateOperationsInput | undefined;

  @NestJsGraphQL.Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  rm_id?: NullableStringFieldUpdateOperationsInput | undefined;
}
