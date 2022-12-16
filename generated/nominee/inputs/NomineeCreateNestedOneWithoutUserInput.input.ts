import * as NestJsGraphQL from "@nestjs/graphql";
import { NomineeCreateOrConnectWithoutUserInput } from "../../nominee/inputs/NomineeCreateOrConnectWithoutUserInput.input";
import { NomineeCreateWithoutUserInput } from "../../nominee/inputs/NomineeCreateWithoutUserInput.input";
import { NomineeWhereUniqueInput } from "../../nominee/inputs/NomineeWhereUniqueInput.input";

@NestJsGraphQL.InputType('NomineeCreateNestedOneWithoutUserInput', { isAbstract: true })
export class NomineeCreateNestedOneWithoutUserInput {
  @NestJsGraphQL.Field(() => NomineeCreateWithoutUserInput, { nullable: true })
  create?: NomineeCreateWithoutUserInput | undefined;

  @NestJsGraphQL.Field(() => NomineeCreateOrConnectWithoutUserInput, { nullable: true })
  connectOrCreate?: NomineeCreateOrConnectWithoutUserInput | undefined;

  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput, { nullable: true })
  connect?: NomineeWhereUniqueInput | undefined;
}
