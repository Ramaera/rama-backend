import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { KYC, Role } from '@prisma/client';
import { NomineeInput } from './createNominee.input';

// ***************************************************************
// *******************Update User Details Input*******************
// ***************************************************************

@InputType()
export class updateUserDemat {
  @Field({ nullable: true })
  demat_account?: string;
}
