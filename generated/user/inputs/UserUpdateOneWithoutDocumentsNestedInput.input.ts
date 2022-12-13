import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateOrConnectWithoutDocumentsInput } from "../../user/inputs/UserCreateOrConnectWithoutDocumentsInput.input";
import { UserCreateWithoutDocumentsInput } from "../../user/inputs/UserCreateWithoutDocumentsInput.input";
import { UserUpdateWithoutDocumentsInput } from "../../user/inputs/UserUpdateWithoutDocumentsInput.input";
import { UserUpsertWithoutDocumentsInput } from "../../user/inputs/UserUpsertWithoutDocumentsInput.input";
import { UserWhereUniqueInput } from "../../user/inputs/UserWhereUniqueInput.input";

@NestJsGraphQL.InputType('UserUpdateOneWithoutDocumentsNestedInput', { isAbstract: true })
export class UserUpdateOneWithoutDocumentsNestedInput {
  @NestJsGraphQL.Field(() => UserCreateWithoutDocumentsInput, { nullable: true })
  create?: UserCreateWithoutDocumentsInput | undefined;

  @NestJsGraphQL.Field(() => UserCreateOrConnectWithoutDocumentsInput, { nullable: true })
  connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput | undefined;

  @NestJsGraphQL.Field(() => UserUpsertWithoutDocumentsInput, { nullable: true })
  upsert?: UserUpsertWithoutDocumentsInput | undefined;

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  disconnect?: boolean | undefined;

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  delete?: boolean | undefined;

  @NestJsGraphQL.Field(() => UserWhereUniqueInput, { nullable: true })
  connect?: UserWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => UserUpdateWithoutDocumentsInput, { nullable: true })
  update?: UserUpdateWithoutDocumentsInput | undefined;
}
