import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { KYC, Membership } from '@prisma/client';
import { NomineeInput } from './createNominee.input';
import { UpdateDocumentsInput } from 'src/documents/dto/update-document';



// ***************************************************************
// *******************Update User Details Input*******************
// ***************************************************************

@InputType()
export class UpdateUserInputByAdmin {

  @Field()
  id:string
  
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



@InputType()
export class UpdateUserStatusAdmin {
  @Field({ nullable: false })
  id: string;

  @Field(()=>KYC)
  kyc: KYC;

}
registerEnumType(KYC,{
  name:'KYC',
})
