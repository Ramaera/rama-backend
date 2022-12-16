import * as NestJsGraphQL from "@nestjs/graphql";
import { KYC, Membership, Role } from "@prisma/client";

@NestJsGraphQL.ObjectType('UserMaxAggregate', { isAbstract: true })
export class UserMaxAggregate {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  id!: string | null;

  @NestJsGraphQL.Field(() => Date, { nullable: true })
  createdAt!: Date | null;

  @NestJsGraphQL.Field(() => Date, { nullable: true })
  updatedAt!: Date | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  email!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  password!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  father_or_husband_name!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  mobile_number!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  alternate_mobile_number!: string | null;

  @NestJsGraphQL.Field(() => KYC, { nullable: true })
  kyc!: "NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED" | null;

  @NestJsGraphQL.Field(() => Role, { nullable: true })
  role!: "ADMIN" | "USER" | null;

  @NestJsGraphQL.Field(() => Membership, { nullable: true })
  membership!: "BASIC" | "ADVANCE" | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  date_of_birth!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  demat_account!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  private_key!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  pw_id!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  rm_id!: string | null;
}
