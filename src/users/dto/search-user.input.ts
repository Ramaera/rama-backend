import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchInput {
  @Field(() => String)
  searchTerm: string;
}
