import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class WalletBalance {
  @Field({ description: 'Agency Id' })
  agencyCode: string;

  @Field({ description: 'Final Balance' })
  finalBalance: number;
}
