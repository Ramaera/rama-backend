import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.InputType('NomineeCreateManyInput', { isAbstract: true })
export class NomineeCreateManyInput {
  @NestJsGraphQL.Field(() => String)
  userPw_id!: string;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name?: string | undefined;

  @NestJsGraphQL.Field(() => String)
  relationship!: string;
}
