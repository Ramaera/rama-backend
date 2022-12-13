import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentUpdateWithoutUserInput } from "../../document/inputs/DocumentUpdateWithoutUserInput.input";
import { DocumentWhereUniqueInput } from "../../document/inputs/DocumentWhereUniqueInput.input";

@NestJsGraphQL.InputType('DocumentUpdateWithWhereUniqueWithoutUserInput', { isAbstract: true })
export class DocumentUpdateWithWhereUniqueWithoutUserInput {
  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput)
  where!: DocumentWhereUniqueInput;

  @NestJsGraphQL.Field(() => DocumentUpdateWithoutUserInput)
  data!: DocumentUpdateWithoutUserInput;
}
