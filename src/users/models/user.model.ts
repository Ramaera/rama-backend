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
import { NomineeModel } from './nominee.model';
import { KycAgencyModel } from './kycAgency.model';
import { AllKycAgency } from 'src/kyc-agency/entities/kyc-agency.entity';
import { DscModule } from 'src/dsc/dsc.module';
import { DscOutputDataField } from 'src/dsc/entities/dsc.entity';
import {
  ProjectEnrolled,
  ProjectEnrolledForAllUser,
} from 'src/project-enrolled/entities/project-enrolled.entity';
import { Shareholding } from 'src/shareholding/entities/shareholding.entity';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

registerEnumType(KYC, {
  name: 'KYC',
  description: 'User KYC Status',
});

@ObjectType()
export class User extends BaseModel {
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

  @Field(() => String, { nullable: true })
  aadharCardNumber?: string | null;

  @Field(() => String, { nullable: true })
  panCardNumber?: string | null;

  @Field(() => String, { nullable: true })
  Address?: string | null;

  @Field(() => [DocumentModal])
  documents?: DocumentModal[] | null;

  @Field(() => [DscOutputDataField])
  DSCDetails?: DscOutputDataField[] | null;

  @Field(() => [ProjectEnrolledForAllUser])
  ProjectEnrolledStatus?: ProjectEnrolledForAllUser[];

  @Field(() => [Shareholding])
  shareHoldingType?: Shareholding[];

  @Field(() => NomineeModel)
  nominee?: NomineeModel;

  @Field(() => [KycAgencyModel])
  kycAgency?: KycAgencyModel[] | null;

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

  @Field(() => String, { nullable: true })
  referralAgencyCode: string;

  @Field(() => Membership)
  membership?: Membership;
}

@ObjectType()
export class KYCHANDLER extends BaseModel {
  @Field(() => String, { nullable: true })
  handlerId?: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => KYC, { nullable: true })
  updatedKycStatus?: KYC;
}
