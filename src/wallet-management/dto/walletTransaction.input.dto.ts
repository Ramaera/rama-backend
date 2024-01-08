import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { REFERRAL_CATEGORY } from '@prisma/client';
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
  documentId?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  category?: REFERRAL_CATEGORY;

  @Field(() => [GraphQLJSONObject], { nullable: true })
  metaData?: any[];
}

registerEnumType(REFERRAL_CATEGORY, {
  name: 'REFERRAL_CATEGORY',
});
