import {
  Field,
  HideField,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { Token } from './token.model';
import { IsEmail } from 'class-validator';
import { KYC, Membership, Role } from '@prisma/client';
import { DocumentModal } from 'src/documents/models/document.models';
import { NomineeModel } from 'src/users/models/nominee.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
