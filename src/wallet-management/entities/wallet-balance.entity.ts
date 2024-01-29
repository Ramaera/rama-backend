import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class WalletBalance {
  @Field({ description: 'Agency Id' })
  agencyCode: string;

  @Field({ description: 'Final Balance' })
  finalBalance: number;
}

@ObjectType()
export class withdrawlRequest {
  @Field({ description: 'Agency Id' })
  agencyCode: string;

  @Field({ description: 'Final Balance' })
  amount: number;

  @Field({ description: 'Final Balance' })
  createdAt: Date;
}
