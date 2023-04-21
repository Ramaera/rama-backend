import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {



  @Field()
  @IsNotEmpty()
  oldpassword:string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;


}







