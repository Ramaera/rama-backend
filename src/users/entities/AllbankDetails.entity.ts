import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../models/user.model';

@ObjectType()
export class AllBankDetails {
  @Field()
  id: string;
  @Field()
  bankName: string;

  @Field()
  accountNumber: string;

  @Field()
  ifscCode: string;

  @Field()
  user: User;

  @Field({ nullable: true })
  status: string;
}
