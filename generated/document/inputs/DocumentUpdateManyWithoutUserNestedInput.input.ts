import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentCreateManyUserInputEnvelope } from "../../document/inputs/DocumentCreateManyUserInputEnvelope.input";
import { DocumentCreateOrConnectWithoutUserInput } from "../../document/inputs/DocumentCreateOrConnectWithoutUserInput.input";
import { DocumentCreateWithoutUserInput } from "../../document/inputs/DocumentCreateWithoutUserInput.input";
import { DocumentScalarWhereInput } from "../../document/inputs/DocumentScalarWhereInput.input";
import { DocumentUpdateManyWithWhereWithoutUserInput } from "../../document/inputs/DocumentUpdateManyWithWhereWithoutUserInput.input";
import { DocumentUpdateWithWhereUniqueWithoutUserInput } from "../../document/inputs/DocumentUpdateWithWhereUniqueWithoutUserInput.input";
import { DocumentUpsertWithWhereUniqueWithoutUserInput } from "../../document/inputs/DocumentUpsertWithWhereUniqueWithoutUserInput.input";
import { DocumentWhereUniqueInput } from "../../document/inputs/DocumentWhereUniqueInput.input";

@NestJsGraphQL.InputType('DocumentUpdateManyWithoutUserNestedInput', { isAbstract: true })
export class DocumentUpdateManyWithoutUserNestedInput {
  @NestJsGraphQL.Field(() => [DocumentCreateWithoutUserInput], { nullable: true })
  create?: DocumentCreateWithoutUserInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentCreateOrConnectWithoutUserInput], { nullable: true })
  connectOrCreate?: DocumentCreateOrConnectWithoutUserInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentUpsertWithWhereUniqueWithoutUserInput], { nullable: true })
  upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput[] | undefined;

  @NestJsGraphQL.Field(() => DocumentCreateManyUserInputEnvelope, { nullable: true })
  createMany?: DocumentCreateManyUserInputEnvelope | undefined;

  @NestJsGraphQL.Field(() => [DocumentWhereUniqueInput], { nullable: true })
  set?: DocumentWhereUniqueInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentWhereUniqueInput], { nullable: true })
  disconnect?: DocumentWhereUniqueInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentWhereUniqueInput], { nullable: true })
  delete?: DocumentWhereUniqueInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentWhereUniqueInput], { nullable: true })
  connect?: DocumentWhereUniqueInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentUpdateWithWhereUniqueWithoutUserInput], { nullable: true })
  update?: DocumentUpdateWithWhereUniqueWithoutUserInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentUpdateManyWithWhereWithoutUserInput], { nullable: true })
  updateMany?: DocumentUpdateManyWithWhereWithoutUserInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentScalarWhereInput], { nullable: true })
  deleteMany?: DocumentScalarWhereInput[] | undefined;
}
