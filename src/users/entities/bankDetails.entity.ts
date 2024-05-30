import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BankDetails {
  @Field()
  id: string;
  @Field({nullable:true})
  bankName: string;

  @Field({nullable:true})
  accountNumber: string;

  @Field({nullable:true})
  ifscCode: string;

  @Field({nullable:true})
  userId: string;

  @Field({ nullable: true })
  status: string;
}
