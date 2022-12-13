import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentCreateManyUserInput } from "../../document/inputs/DocumentCreateManyUserInput.input";

@NestJsGraphQL.InputType('DocumentCreateManyUserInputEnvelope', { isAbstract: true })
export class DocumentCreateManyUserInputEnvelope {
  @NestJsGraphQL.Field(() => [DocumentCreateManyUserInput])
  data!: DocumentCreateManyUserInput[];

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean | undefined;
}
