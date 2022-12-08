import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  name: string;

  // @Field({ nullable: true })
  // father_or_husband_name?: string;

  @Field({ nullable: true })
  mobile?: string;

  // @Field({ nullable: true })
  // alternate_mobile?: string;

  // @Field({ nullable: true })
  // DOB?: string;

  // @Field({ nullable: true })
  // Demat_Account?: string;

  // @Field({ nullable: true })
  // Private_key?: string;

  @Field()
  pw_id: string;

  // @Field({ nullable: true })
  // RM_id?:string;
  
  
}

