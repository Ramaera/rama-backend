import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Membership } from '@prisma/client';

@InputType()
export class SearchInput {
  @Field(() => String)
  searchTerm: string;
}

@InputType()
export class SearchMembershipInput {
  @Field(() => Membership)
  searchTerm?: Membership;
}

registerEnumType(Membership, {
  name: 'Membership',
});
