import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateOrConnectWithoutNomineeInput } from "../../user/inputs/UserCreateOrConnectWithoutNomineeInput.input";
import { UserCreateWithoutNomineeInput } from "../../user/inputs/UserCreateWithoutNomineeInput.input";
import { UserUpdateWithoutNomineeInput } from "../../user/inputs/UserUpdateWithoutNomineeInput.input";
import { UserUpsertWithoutNomineeInput } from "../../user/inputs/UserUpsertWithoutNomineeInput.input";
import { UserWhereUniqueInput } from "../../user/inputs/UserWhereUniqueInput.input";

@NestJsGraphQL.InputType('UserUpdateOneWithoutNomineeNestedInput', { isAbstract: true })
export class UserUpdateOneWithoutNomineeNestedInput {
  @NestJsGraphQL.Field(() => UserCreateWithoutNomineeInput, { nullable: true })
  create?: UserCreateWithoutNomineeInput | undefined;

  @NestJsGraphQL.Field(() => UserCreateOrConnectWithoutNomineeInput, { nullable: true })
  connectOrCreate?: UserCreateOrConnectWithoutNomineeInput | undefined;

  @NestJsGraphQL.Field(() => UserUpsertWithoutNomineeInput, { nullable: true })
  upsert?: UserUpsertWithoutNomineeInput | undefined;

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  disconnect?: boolean | undefined;

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  delete?: boolean | undefined;

  @NestJsGraphQL.Field(() => UserWhereUniqueInput, { nullable: true })
  connect?: UserWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => UserUpdateWithoutNomineeInput, { nullable: true })
  update?: UserUpdateWithoutNomineeInput | undefined;
}
