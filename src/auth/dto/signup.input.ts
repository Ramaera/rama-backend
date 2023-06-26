import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Membership } from '@prisma/client';

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

  @Field()
  referralAgencyCode?: string;

  @Field(() => Membership)
  membership?: Membership;
}
registerEnumType(Membership, {
  name: 'Membership',
});
