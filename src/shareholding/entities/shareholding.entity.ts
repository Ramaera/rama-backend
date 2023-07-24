import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Shareholding {
  @Field(() => String, { description: 'Example field (placeholder)' })
  InvestmentType: string;
}
