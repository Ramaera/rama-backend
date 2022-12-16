import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.ObjectType('NomineeMaxAggregate', { isAbstract: true })
export class NomineeMaxAggregate {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  userPw_id!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  relationship!: string | null;
}
