import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.InputType('UserWhereUniqueInput', { isAbstract: true })
export class UserWhereUniqueInput {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  id?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  email?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  pw_id?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  rm_id?: string | undefined;
}
