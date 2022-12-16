import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateOrConnectWithoutDocumentsInput } from "../../user/inputs/UserCreateOrConnectWithoutDocumentsInput.input";
import { UserCreateWithoutDocumentsInput } from "../../user/inputs/UserCreateWithoutDocumentsInput.input";
import { UserWhereUniqueInput } from "../../user/inputs/UserWhereUniqueInput.input";

@NestJsGraphQL.InputType('UserCreateNestedOneWithoutDocumentsInput', { isAbstract: true })
export class UserCreateNestedOneWithoutDocumentsInput {
  @NestJsGraphQL.Field(() => UserCreateWithoutDocumentsInput, { nullable: true })
  create?: UserCreateWithoutDocumentsInput | undefined;

  @NestJsGraphQL.Field(() => UserCreateOrConnectWithoutDocumentsInput, { nullable: true })
  connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput | undefined;

  @NestJsGraphQL.Field(() => UserWhereUniqueInput, { nullable: true })
  connect?: UserWhereUniqueInput | undefined;
}
