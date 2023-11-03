import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Membership } from '@prisma/client';

@InputType()
export class SearchInvestmentType {
  @Field()
  searchTerm: string;
}
