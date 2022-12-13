import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentCreateManyUserInputEnvelope } from "../../document/inputs/DocumentCreateManyUserInputEnvelope.input";
import { DocumentCreateOrConnectWithoutUserInput } from "../../document/inputs/DocumentCreateOrConnectWithoutUserInput.input";
import { DocumentCreateWithoutUserInput } from "../../document/inputs/DocumentCreateWithoutUserInput.input";
import { DocumentWhereUniqueInput } from "../../document/inputs/DocumentWhereUniqueInput.input";

@NestJsGraphQL.InputType('DocumentCreateNestedManyWithoutUserInput', { isAbstract: true })
export class DocumentCreateNestedManyWithoutUserInput {
  @NestJsGraphQL.Field(() => [DocumentCreateWithoutUserInput], { nullable: true })
  create?: DocumentCreateWithoutUserInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentCreateOrConnectWithoutUserInput], { nullable: true })
  connectOrCreate?: DocumentCreateOrConnectWithoutUserInput[] | undefined;

  @NestJsGraphQL.Field(() => DocumentCreateManyUserInputEnvelope, { nullable: true })
  createMany?: DocumentCreateManyUserInputEnvelope | undefined;

  @NestJsGraphQL.Field(() => [DocumentWhereUniqueInput], { nullable: true })
  connect?: DocumentWhereUniqueInput[] | undefined;
}
