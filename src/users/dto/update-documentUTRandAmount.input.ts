import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { KYC, Role } from '@prisma/client';
import { NomineeInput } from './createNominee.input';

// ***************************************************************
// *******************Update User Details Input*******************
// ***************************************************************

@InputType()
export class UpdateDocumentUTRandAmountInput {
  @Field({ nullable: true })
  utrNo?: string | null;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  documentId?: string;
}
