import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../models/user.model';

@ObjectType()
export class AllBankDetails {
  @Field()
  id: string;
  @Field({ nullable: true })
  bankName: string;

  @Field({ nullable: true })
  accountNumber: string;

  @Field({ nullable: true })
  ifscCode: string;

  @Field()
  user: User;

  @Field({ nullable: true })
  status: string;
}
