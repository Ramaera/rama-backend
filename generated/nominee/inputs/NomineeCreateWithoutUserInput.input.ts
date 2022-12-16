import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.InputType('NomineeCreateWithoutUserInput', { isAbstract: true })
export class NomineeCreateWithoutUserInput {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  name?: string | undefined;

  @NestJsGraphQL.Field(() => String)
  relationship!: string;
}
