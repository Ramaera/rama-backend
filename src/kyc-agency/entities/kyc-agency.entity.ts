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

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Role)
  role: Role;

  @Field(() => String, { nullable: true })
  rm_id: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class KYCAGENYCPAYMENT {
  @Field(() => Int, { nullable: true })
  hajipurProjectAmount: number;

  @Field(() => Int, { nullable: true })
  agraProjectAmount: number;

  @Field(() => Int, { nullable: true })
  kycAmount: number;

  @Field(() => [User], { nullable: true })
  BasicKycApprovedUser: User[];

  @Field(() => [User], { nullable: true })
  AdvanceKycApprovedUser: User[];

  @Field(() => [DocumentModal], { nullable: true })
  basicAgraprojectDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  advanceAgraprojectDocument: DocumentModal[];

  @Field(() => [DocumentModal], { nullable: true })
  basicHajipurprojectDocument: DocumentModal[];

  @Field(() => Int, { nullable: true })
  selfAgencyHajipurPayment: number;

  @Field(() => Int, { nullable: true })
  selfAgencyAgraPayment: number;

  @Field(() => [DocumentModal], { nullable: true })
  advanceHajipurprojectDocument: DocumentModal[];
}
