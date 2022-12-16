import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentScalarWhereInput } from "../../document/inputs/DocumentScalarWhereInput.input";
import { DocumentUpdateManyMutationInput } from "../../document/inputs/DocumentUpdateManyMutationInput.input";

@NestJsGraphQL.InputType('DocumentUpdateManyWithWhereWithoutUserInput', { isAbstract: true })
export class DocumentUpdateManyWithWhereWithoutUserInput {
  @NestJsGraphQL.Field(() => DocumentScalarWhereInput)
  where!: DocumentScalarWhereInput;

  @NestJsGraphQL.Field(() => DocumentUpdateManyMutationInput)
  data!: DocumentUpdateManyMutationInput;
}
