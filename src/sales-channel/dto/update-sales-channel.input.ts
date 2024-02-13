import { CreateSalesChannelInput } from './create-sales-channel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSalesChannelInput extends PartialType(CreateSalesChannelInput) {
  @Field(() => Int)
  id: number;
}
