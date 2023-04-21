import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { KYC } from '@prisma/client';
import { NomineeInput } from './createNominee.input';



// ***************************************************************
// *******************Update User Details Input*******************
// ***************************************************************

@InputType()
export class UpdateUserInput {

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  father_or_husband_name?: string;


  @Field({ nullable: true })
  email?: string;


   @Field({ nullable: true })
  mobile_number?: string

   @Field({ nullable: true })
  alternate_mobile_number?: string


   @Field({ nullable: true })
  date_of_birth?: string

   @Field({ nullable: true })
  demat_account?: string

 

}


registerEnumType(KYC,{
  name:'KYC',
})
