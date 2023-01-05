import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {

  // @Field()
  // @IsNotEmpty()
  // pw_id:string

  @Field()
  @IsNotEmpty()
  private_key:string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;


}







