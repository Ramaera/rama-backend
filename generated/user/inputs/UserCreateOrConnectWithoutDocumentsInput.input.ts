import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateWithoutDocumentsInput } from "../../user/inputs/UserCreateWithoutDocumentsInput.input";
import { UserWhereUniqueInput } from "../../user/inputs/UserWhereUniqueInput.input";

@NestJsGraphQL.InputType('UserCreateOrConnectWithoutDocumentsInput', { isAbstract: true })
export class UserCreateOrConnectWithoutDocumentsInput {
  @NestJsGraphQL.Field(() => UserWhereUniqueInput)
  where!: UserWhereUniqueInput;

  @NestJsGraphQL.Field(() => UserCreateWithoutDocumentsInput)
  create!: UserCreateWithoutDocumentsInput;
}
