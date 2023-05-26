import { IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  pw_id: string;

  @Field()
  @IsNotEmpty()
  // @MinLength(8)
  password: string;

  // @Field()
  // RM_id?:Number;
}
