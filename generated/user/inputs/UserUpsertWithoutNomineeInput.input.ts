import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateWithoutNomineeInput } from "../../user/inputs/UserCreateWithoutNomineeInput.input";
import { UserUpdateWithoutNomineeInput } from "../../user/inputs/UserUpdateWithoutNomineeInput.input";

@NestJsGraphQL.InputType('UserUpsertWithoutNomineeInput', { isAbstract: true })
export class UserUpsertWithoutNomineeInput {
  @NestJsGraphQL.Field(() => UserUpdateWithoutNomineeInput)
  update!: UserUpdateWithoutNomineeInput;

  @NestJsGraphQL.Field(() => UserCreateWithoutNomineeInput)
  create!: UserCreateWithoutNomineeInput;
}
