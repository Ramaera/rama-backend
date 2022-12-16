import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateOrConnectWithoutNomineeInput } from "../../user/inputs/UserCreateOrConnectWithoutNomineeInput.input";
import { UserCreateWithoutNomineeInput } from "../../user/inputs/UserCreateWithoutNomineeInput.input";
import { UserWhereUniqueInput } from "../../user/inputs/UserWhereUniqueInput.input";

@NestJsGraphQL.InputType('UserCreateNestedOneWithoutNomineeInput', { isAbstract: true })
export class UserCreateNestedOneWithoutNomineeInput {
  @NestJsGraphQL.Field(() => UserCreateWithoutNomineeInput, { nullable: true })
  create?: UserCreateWithoutNomineeInput | undefined;

  @NestJsGraphQL.Field(() => UserCreateOrConnectWithoutNomineeInput, { nullable: true })
  connectOrCreate?: UserCreateOrConnectWithoutNomineeInput | undefined;

  @NestJsGraphQL.Field(() => UserWhereUniqueInput, { nullable: true })
  connect?: UserWhereUniqueInput | undefined;
}
