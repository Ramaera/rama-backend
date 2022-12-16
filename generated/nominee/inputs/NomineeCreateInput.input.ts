import * as NestJsGraphQL from "@nestjs/graphql";
import { UserCreateNestedOneWithoutNomineeInput } from "../../user/inputs/UserCreateNestedOneWithoutNomineeInput.input";

@NestJsGraphQL.InputType('NomineeCreateInput', { isAbstract: true })
export class NomineeCreateInput {
  @NestJsGraphQL.Field(() => UserCreateNestedOneWithoutNomineeInput, { nullable: true })
  user?: UserCreateNestedOneWithoutNomineeInput | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name?: string | undefined;

  @NestJsGraphQL.Field(() => String)
  relationship!: string;
}
