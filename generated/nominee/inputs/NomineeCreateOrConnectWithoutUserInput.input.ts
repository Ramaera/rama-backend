import * as NestJsGraphQL from "@nestjs/graphql";
import { NomineeCreateWithoutUserInput } from "../../nominee/inputs/NomineeCreateWithoutUserInput.input";
import { NomineeWhereUniqueInput } from "../../nominee/inputs/NomineeWhereUniqueInput.input";

@NestJsGraphQL.InputType('NomineeCreateOrConnectWithoutUserInput', { isAbstract: true })
export class NomineeCreateOrConnectWithoutUserInput {
  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput)
  where!: NomineeWhereUniqueInput;

  @NestJsGraphQL.Field(() => NomineeCreateWithoutUserInput)
  create!: NomineeCreateWithoutUserInput;
}
