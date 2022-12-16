import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.ObjectType('NomineeCountAggregate', { isAbstract: true })
export class NomineeCountAggregate {
  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  userPw_id!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  name!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  relationship!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  _all!: number;
}
