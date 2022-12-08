import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PasswordRequestInput {
  
  @Field()
  pw_id: string;

}
