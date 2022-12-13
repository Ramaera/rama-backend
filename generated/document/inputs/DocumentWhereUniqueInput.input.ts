import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.InputType('DocumentWhereUniqueInput', { isAbstract: true })
export class DocumentWhereUniqueInput {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  id?: string | undefined;
}
