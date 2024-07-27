import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { KYC, Role } from '@prisma/client';
import { NomineeInput } from './createNominee.input';

// ***************************************************************
// *******************Visit User Input*******************
// ***************************************************************

@InputType()
export class VisitUserInputData {
 




  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  projectName?: string;
}
