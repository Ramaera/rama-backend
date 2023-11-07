import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Membership } from '@prisma/client';

@InputType()
export class SearchInvestmentType {
  @Field()
  searchProject?: string;

  @Field()
  name?: string;

  @Field(() => Membership)
  searchMembership?: Membership;
}

registerEnumType(Membership, {
  name: 'Membership',
});
