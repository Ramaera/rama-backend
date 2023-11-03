import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Shareholding {
  @Field(() => String, { description: 'InvestMent TYPE' })
  InvestmentType: string;

  @Field(() => String, { description: 'alloted Share', nullable: true })
  allotedShare: string;

  @Field(() => String, { description: 'Status' })
  status: string;

  @Field(() => User)
  user?: User;
}
