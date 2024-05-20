import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BankDetails {
  @Field()
  id: string;
  @Field()
  bankName: string;

  @Field()
  accountNumber: string;

  @Field()
  ifscCode: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  status: string;
}
