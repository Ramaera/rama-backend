import * as NestJsGraphQL from "@nestjs/graphql";
import { KYC, Membership, Role } from "../../common/enums";
import { DocumentCreateNestedManyWithoutUserInput } from "../../document/inputs/DocumentCreateNestedManyWithoutUserInput.input";
import { NomineeCreateNestedOneWithoutUserInput } from "../../nominee/inputs/NomineeCreateNestedOneWithoutUserInput.input";

@NestJsGraphQL.InputType('UserCreateInput', { isAbstract: true })
export class UserCreateInput {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  id?: string | undefined;

  @NestJsGraphQL.Field(() => Date, { nullable: true })
  createdAt?: Date | undefined;

  @NestJsGraphQL.Field(() => Date, { nullable: true })
  updatedAt?: Date | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  email?: string | undefined;

  @NestJsGraphQL.Field(() => String)
  password!: string;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  father_or_husband_name?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  mobile_number?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  alternate_mobile_number?: string | undefined;

  @NestJsGraphQL.Field(() => DocumentCreateNestedManyWithoutUserInput, { nullable: true })
  documents?: DocumentCreateNestedManyWithoutUserInput | undefined;

  @NestJsGraphQL.Field(() => NomineeCreateNestedOneWithoutUserInput, { nullable: true })
  nominee?: NomineeCreateNestedOneWithoutUserInput | undefined;

  @NestJsGraphQL.Field(() => KYC, { nullable: true })
  kyc?: "NOT_INITIALIZED" | "SUBMITTED" | "ONGOING" | "REJECTED" | "APPROVED" | undefined;

  @NestJsGraphQL.Field(() => Role)
  role!: "ADMIN" | "USER";

  @NestJsGraphQL.Field(() => Membership, { nullable: true })
  membership?: "BASIC" | "ADVANCE" | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  date_of_birth?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  demat_account?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  private_key?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  pw_id?: string | undefined;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  rm_id?: string | undefined;
}
