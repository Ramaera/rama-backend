import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { InputType, Field, } from '@nestjs/graphql';


@InputType()
export class SignupInput {
  @Field()
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  name?: string;


  @Field({ nullable: true })
  mobile?: string;


  @Field()
  pw_id: string;

 
  
  
}

