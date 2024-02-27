import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { KYC, Role } from '@prisma/client';
import { NomineeInput } from './createNominee.input';

// ***************************************************************
// *******************Update User Details Input*******************
// ***************************************************************

@InputType()
export class UpdateDocumentInput {
  @Field({ nullable: true })
  url?: string | null;

  @Field({ nullable: true })
  documentId?: string;
}
