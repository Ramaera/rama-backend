import { InputType, Field } from '@nestjs/graphql';



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
  Mobile?: string;

  @Field({ nullable: true })
  Alternate_Mobile_number?: string;

  @Field({ nullable: true })
  DOB?: string;

  @Field({ nullable: true })
  Demat_Account?: string;

  @Field({ nullable: true })
  Private_Key?: string;

  @Field({ nullable: true })
  email?: string;


}
