import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEnrollmentPaymentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
