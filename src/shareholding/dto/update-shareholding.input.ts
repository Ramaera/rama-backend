import { CreateShareholdingInput } from './create-shareholding.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShareholdingInput extends PartialType(
  CreateShareholdingInput
) {
  @Field(() => String)
  id: string;
}
