import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KycAgencyModel {
  @Field(() => String)
  id!: string;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Date)
  agencyExpiryDate?: Date;

  @Field(() => String, { nullable: true })
  agencyCode?: string;
}
