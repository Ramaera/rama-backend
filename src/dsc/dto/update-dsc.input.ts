import { CreateDscInput } from './create-dsc.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDscInput extends PartialType(CreateDscInput) {
  @Field(() => Int)
  id: number;
}
