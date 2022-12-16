import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.InputType('NomineeWhereUniqueInput', { isAbstract: true })
export class NomineeWhereUniqueInput {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  userPw_id?: string | undefined;
}
