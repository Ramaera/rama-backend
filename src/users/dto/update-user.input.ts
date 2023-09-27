import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { KYC, Role } from '@prisma/client';
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
  mobile_number?: string;

  @Field({ nullable: true })
  alternate_mobile_number?: string;

  @Field({ nullable: true })
  aadharCardNumber?: string | null;

  @Field({ nullable: true })
  panCardNumber?: string | null;

  @Field({ nullable: true })
  Address?: string | null;

  @Field({ nullable: true })
  date_of_birth?: string;

  @Field({ nullable: true })
  demat_account?: string;
}

@InputType()
export class DeleteUserInput {
  @Field({ nullable: true })
  id?: string;
}

@InputType()
export class UpdateUserRoleInput {
  @Field(() => String)
  id: string;

  @Field(() => Role)
  role: Role;
}

registerEnumType(Role, {
  name: 'Role',
});

registerEnumType(KYC, {
  name: 'KYC',
});
