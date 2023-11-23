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
class STOW {
  @Field()
  agencyCode: string;

  @Field(() => [User])
  users: User[];
}
export { STOW, User };
