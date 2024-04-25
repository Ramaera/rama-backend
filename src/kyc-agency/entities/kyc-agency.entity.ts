import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
  Int,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from 'src/common/models/base.model';
import { Role, KYC, Membership } from '@prisma/client';
import { DocumentModal } from 'src/documents/models/document.models';
import { NomineeModel } from 'src/users/models/nominee.model';
import { User } from 'src/users/models/user.model';

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
  agencyCode?: string;

  @Field(() => String)
  id!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => Date)
  agencyExpiryDate!: Date;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class KYCAGENYCPAYMENT {
  @Field(() => Int, { nullable: true })
  hajipurProjectAmount: number;

  @Field(() => Int, { nullable: true })
  chapraProjectAmount: number;

  @Field(() => Int, { nullable: true })
  jhansiProjectAmount: number;

  @Field(() => Int, { nullable: true })
  agraProjectAmount: number;

  @Field(() => Int, { nullable: true })
  hyderabadProjectAmount: number;

  @Field(() => Int, { nullable: true })
  kycAmount: number;

  @Field(() => [User], { nullable: true })
  KycApprovedUser: User[];

  @Field(() => [DocumentModal], { nullable: true })
  HajipurprojectDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  JhansiprojectDocument: DocumentModal[];
  @Field(() => [DocumentModal], { nullable: true })
  ChapraprojectDocument: DocumentModal[];
  @Field(() => [DocumentModal], { nullable: true })
  selfAgraInvestmentDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  selfHajipurInvestmentDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  selfJhansiInvestmentDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  selfChapraInvestmentDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  AgraprojectDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  HyderabadprojectDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  selfHyderabadInvestmentDocument: DocumentModal[];

  @Field(() => Int, { nullable: true })
  selfAgencyHajipurPaymentAmount: number;

  @Field(() => Int, { nullable: true })
  selfAgencyJhansiPaymentAmount: number;

  @Field(() => Int, { nullable: true })
  selfAgencyChapraPaymentAmount: number;

  @Field(() => Int, { nullable: true })
  selfAgencyAgraPaymentAmount: number;

  @Field(() => Int, { nullable: true })
  selfAgencyHyderabadPaymentAmount: number;

  @Field(() => Int, { nullable: true })
  kycRewardAmount?: number;
}
