import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from 'src/common/models/base.model';
import { Role, KYC, Membership } from '@prisma/client';
import { DocumentModal } from 'src/documents/models/document.models';
import { NomineeModel } from 'src/users/models/nominee.model';

@ObjectType()
export class AllKycAgency {
  @Field(() => String, { nullable: true })
  agencyCode: string;

  @Field(() => String, { nullable: true })
  name: string;
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

registerEnumType(KYC, {
  name: 'KYC',
  description: 'User KYC Status',
});

@ObjectType()
export class KycAgency extends BaseModel {
  @Field(() => String, { nullable: true })
  referralAgencyCode: string;

  @Field()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Role)
  role: Role;

  @Field(() => String, { nullable: true })
  rm_id: string;

  @HideField()
  password: string;

  @Field(() => String)
  id!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => String, { nullable: true })
  father_or_husband_name?: string | null;

  @Field(() => String, { nullable: true })
  mobile_number?: string | null;

  @Field(() => String, { nullable: true })
  alternate_mobile_number?: string | null;

  @Field(() => [DocumentModal])
  documents?: DocumentModal[] | null;

  @Field(() => NomineeModel)
  nominee?: NomineeModel;

  @Field(() => KYC)
  kyc!: KYC;

  @Field(() => String, { nullable: true })
  date_of_birth?: string | null;

  @Field(() => String, { nullable: true })
  demat_account?: string | null;

  @Field(() => String, { nullable: true })
  @HideField()
  private_key?: string | null;

  @Field(() => String, { nullable: true })
  pw_id?: string | null;

  @Field(() => Membership)
  membership?: Membership;
}
