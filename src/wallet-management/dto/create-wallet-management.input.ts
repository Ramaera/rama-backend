import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWalletManagementInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
