import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Shareholding {
  @Field(() => String, { description: 'InvestMent TYPE' })
  InvestmentType: string;

  @Field(() => String, { description: 'alloted Share', nullable: true })
  allotedShare: string;

  @Field(() => String, { description: 'Status' })
  status: string;

  // @Field(() => String, { description: 'InvestMent TYPE' })
  // allotedShare: string;
}
