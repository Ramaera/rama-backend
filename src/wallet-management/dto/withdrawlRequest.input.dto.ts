import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WithdraWalletMoney {
  @Field(() => Int)
  amount: number;

  @Field(() => String)
  agencyCode: string;
}
