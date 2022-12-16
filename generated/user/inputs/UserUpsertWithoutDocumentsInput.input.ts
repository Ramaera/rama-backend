import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateWithoutDocumentsInput } from "../../user/inputs/UserCreateWithoutDocumentsInput.input";
import { UserUpdateWithoutDocumentsInput } from "../../user/inputs/UserUpdateWithoutDocumentsInput.input";

@NestJsGraphQL.InputType('UserUpsertWithoutDocumentsInput', { isAbstract: true })
export class UserUpsertWithoutDocumentsInput {
  @NestJsGraphQL.Field(() => UserUpdateWithoutDocumentsInput)
  update!: UserUpdateWithoutDocumentsInput;

  @NestJsGraphQL.Field(() => UserCreateWithoutDocumentsInput)
  create!: UserCreateWithoutDocumentsInput;
}
