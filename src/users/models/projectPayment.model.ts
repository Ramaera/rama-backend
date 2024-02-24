import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class projectPaymentDTO {
  @Field(() => Int)
  ProjectHajipurAmountReceived?: number;

  @Field(() => Int)
  ProjectAgraAmountReceived?: number;

  @Field(() => Int)
  ProjectHyderabadAmountReceived?: number;
}
