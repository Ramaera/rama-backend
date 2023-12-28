import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
@InputType()
export class MetaDataInput {
  @Field(() => String, { nullable: true })
  userId: string;
}

@InputType()
export class WalletTransactionInput {
  @Field()
  amount: number;

  @Field()
  agencyCode?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => [GraphQLJSONObject], { nullable: true })
  metaData?: any[];
}
