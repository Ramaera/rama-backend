import { CreateWalletManagementInput } from './create-wallet-management.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWalletManagementInput extends PartialType(CreateWalletManagementInput) {
  @Field(() => Int)
  id: number;
}
