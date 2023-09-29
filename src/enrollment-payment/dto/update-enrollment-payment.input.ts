import { CreateEnrollmentPaymentInput } from './create-enrollment-payment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEnrollmentPaymentInput extends PartialType(CreateEnrollmentPaymentInput) {
  @Field(() => Int)
  id: number;
}
