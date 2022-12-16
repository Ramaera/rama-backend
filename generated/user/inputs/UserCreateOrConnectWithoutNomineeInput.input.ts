import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateWithoutNomineeInput } from "../../user/inputs/UserCreateWithoutNomineeInput.input";
import { UserWhereUniqueInput } from "../../user/inputs/UserWhereUniqueInput.input";

@NestJsGraphQL.InputType('UserCreateOrConnectWithoutNomineeInput', { isAbstract: true })
export class UserCreateOrConnectWithoutNomineeInput {
  @NestJsGraphQL.Field(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput;

  @NestJsGraphQL.Field(() => UserCreateWithoutNomineeInput)
  create!: UserCreateWithoutNomineeInput;
}
