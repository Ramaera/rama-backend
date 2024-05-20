import { IsNotEmpty } from 'class-validator';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { STATUS } from '@prisma/client';

@InputType()
export class UpdateBankDetailsInput {
  @Field({ nullable: true })
  userId: string;

  @Field(() => String, { nullable: true })
  bankName: string;

  @Field({ nullable: true })
  accountNumber: string;

  @Field({ nullable: true })
  ifscCode: string;

  @Field(() => STATUS)
  status?: STATUS;
}

registerEnumType(STATUS, {
  name: 'STATUS',
});
