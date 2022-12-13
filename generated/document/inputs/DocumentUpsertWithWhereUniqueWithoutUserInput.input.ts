import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentCreateWithoutUserInput } from "../../document/inputs/DocumentCreateWithoutUserInput.input";
import { DocumentUpdateWithoutUserInput } from "../../document/inputs/DocumentUpdateWithoutUserInput.input";
import { DocumentWhereUniqueInput } from "../../document/inputs/DocumentWhereUniqueInput.input";

@NestJsGraphQL.InputType('DocumentUpsertWithWhereUniqueWithoutUserInput', { isAbstract: true })
export class DocumentUpsertWithWhereUniqueWithoutUserInput {
  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput)
  where!: DocumentWhereUniqueInput;

  @NestJsGraphQL.Field(() => DocumentUpdateWithoutUserInput)
  update!: DocumentUpdateWithoutUserInput;

  @NestJsGraphQL.Field(() => DocumentCreateWithoutUserInput)
  create!: DocumentCreateWithoutUserInput;
}
