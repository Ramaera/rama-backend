import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { KYC, Role } from '@prisma/client';
import { NomineeInput } from './createNominee.input';

// ***************************************************************
// *******************Update User Details Input*******************
// ***************************************************************

@InputType()
export class UpdateNomineeDetailsInput {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  relationship?: string;
}
