import * as NestJsGraphQL from "@nestjs/graphql";
import { NomineeCreateWithoutUserInput } from "../../nominee/inputs/NomineeCreateWithoutUserInput.input";
import { NomineeUpdateWithoutUserInput } from "../../nominee/inputs/NomineeUpdateWithoutUserInput.input";

@NestJsGraphQL.InputType('NomineeUpsertWithoutUserInput', { isAbstract: true })
export class NomineeUpsertWithoutUserInput {
  @NestJsGraphQL.Field(() => NomineeUpdateWithoutUserInput)
  update!: NomineeUpdateWithoutUserInput;

  @NestJsGraphQL.Field(() => NomineeCreateWithoutUserInput)
  create!: NomineeCreateWithoutUserInput;
}
