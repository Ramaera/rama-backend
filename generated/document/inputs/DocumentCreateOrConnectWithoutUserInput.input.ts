import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentCreateWithoutUserInput } from "../../document/inputs/DocumentCreateWithoutUserInput.input";
import { DocumentWhereUniqueInput } from "../../document/inputs/DocumentWhereUniqueInput.input";

@NestJsGraphQL.InputType('DocumentCreateOrConnectWithoutUserInput', { isAbstract: true })
export class DocumentCreateOrConnectWithoutUserInput {
  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput)
  where!: DocumentWhereUniqueInput;

  @NestJsGraphQL.Field(() => DocumentCreateWithoutUserInput)
  create!: DocumentCreateWithoutUserInput;
}
