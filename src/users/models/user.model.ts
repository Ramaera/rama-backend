import 'reflect-metadata';
import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';
// import {Document} from 'src/documents/models/document.models'

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
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

  // @Field(() => [Document])
  // documents: [Document] | null;

  @Field(()=>String, { nullable: true }) 
  RM_id:string

  @HideField()
  password: string;
}
