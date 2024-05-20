import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BankDetailsInput {
  @Field({ nullable: true })
  userId: string;

  @Field(() => String, { nullable: true })
  bankName: string;

  @Field({ nullable: true })
  accountNumber: string;

  @Field({ nullable: true })
  ifscCode: string;
}
