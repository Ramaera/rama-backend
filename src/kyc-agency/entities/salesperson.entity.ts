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
import { Role, KYC, Membership, TYPE, STATUS } from '@prisma/client';
import { DocumentModal } from 'src/documents/models/document.models';
import { NomineeModel } from 'src/users/models/nominee.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class SalesPersonOutPut {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  mobileNumber: string;
  @Field(() => String, { nullable: true })
  address: string;
  @Field(() => String, { nullable: true })
  extraInfo: string;

  // @Field({ nullable: true })
  // type: string;
  @Field({ nullable: true })
  approvalStatus: string;
  @Field(() => String, { nullable: true })
  agencyCode: string;
}

// registerEnumType(TYPE, {
//   name: 'TYPE',
//   description: 'User TYPE',
// });

// registerEnumType(STATUS, {
//   name: 'STATUS',
//   description: 'User  Status',
// });
