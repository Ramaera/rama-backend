import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.ObjectType('NomineeMinAggregate', { isAbstract: true })
export class NomineeMinAggregate {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  userPw_id!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  relationship!: string | null;
}
