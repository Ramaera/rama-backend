import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateShareholdingInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  InvestmentType?: string;

  @Field(() => Number)
  allotedShare?: number;
}
