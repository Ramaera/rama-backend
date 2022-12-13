import * as NestJsGraphQL from "@nestjs/graphql";

@NestJsGraphQL.ObjectType('UserCountAggregate', { isAbstract: true })
export class UserCountAggregate {
  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  id!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  createdAt!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  updatedAt!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  email!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  password!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  name!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  father_or_husband_name!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  mobile_number!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  alternate_mobile_number!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  kyc!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  role!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  membership!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  date_of_birth!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  demat_account!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  private_key!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  pw_id!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  rm_id!: number;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int)
  _all!: number;
}
