import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Membership } from '@prisma/client';

@InputType()
export class SponserDetails {
  @Field()
  ReferralCode?: string;
}
