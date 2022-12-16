import * as NestJsGraphQL from "@nestjs/graphql";
import { KYC, Membership, Role } from "../enums/KYC.enum";
import { Document } from "../models/document.model";
import { Nominee } from "../models/nominee.model";
import { UserCount } from "../user/outputs/UserCount.output";

@NestJsGraphQL.ObjectType('User', { isAbstract: true })
export class User {
  @NestJsGraphQL.Field(() => String)
  id!: string;

  @NestJsGraphQL.Field(() => Date)
  createdAt!: Date;

  @NestJsGraphQL.Field(() => Date)
  updatedAt!: Date;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  email?: string | null;

  @NestJsGraphQL.Field(() => String)
  password!: string;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name?: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  father_or_husband_name?: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  mobile_number?: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  alternate_mobile_number?: string | null;

  documents?: Document[];

  nominee?: Nominee | null;

  @NestJsGraphQL.Field(() => KYC)
  kyc!: "NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED";

  @NestJsGraphQL.Field(() => Role)
  role!: "ADMIN" | "USER";

  @NestJsGraphQL.Field(() => Membership)
  membership!: "BASIC" | "ADVANCE";

  @NestJsGraphQL.Field(() => String, { nullable: true })
  date_of_birth?: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  demat_account?: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  private_key?: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  pw_id?: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  rm_id?: string | null;

  @NestJsGraphQL.Field(() => UserCount, { nullable: true })
  _count?: UserCount | null;
}
