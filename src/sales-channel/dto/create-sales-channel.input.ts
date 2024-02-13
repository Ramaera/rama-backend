import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSalesChannelInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
