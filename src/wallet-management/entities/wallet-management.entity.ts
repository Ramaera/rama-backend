import { ObjectType, Field, Int } from '@nestjs/graphql';
import { REFERRAL_CATEGORY } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class Wallet {
  @Field({ description: 'Id of Transaction' })
  id: number;

  @Field({ description: 'Transaction Created At ' })
  createdAt: Date;

  @Field({ description: 'Transaction Updated At ' })
  updatedAt: Date;

  @Field({ description: 'Transaction Amount' })
  amount: number;

  @Field({ description: 'Agency COde' })
  agencyCode: string;

  @Field({ description: ' Type of Transaction DEPOSIT or WITHDRAWL' })
  type: string;

  @Field({ description: 'Final Balance' })
  finalBalance: number;

  @Field({ nullable: true })
  category?: string;

  @Field(() => [GraphQLJSONObject], { nullable: true })
  metaData?: any;
}
