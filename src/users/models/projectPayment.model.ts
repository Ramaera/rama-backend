import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class projectPaymentDTO {
  @Field(() => Int)
  ProjectAmountReceived?: number;

  // @Field(() => Int)
  // ProjectAgraAmountReceived?: number;

  // @Field(() => Int)
  // ProjectHyderabadAmountReceived?: number;

  // @Field(() => Int)
  // ProjectFundingReplacementAmountReceived?: number;
}
