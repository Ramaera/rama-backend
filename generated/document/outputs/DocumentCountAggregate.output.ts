import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.ObjectType('DocumentCountAggregate', { isAbstract: true })
export class DocumentCountAggregate {
  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  id!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  title!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  url!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  userId!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  status!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  _all!: number;
}
