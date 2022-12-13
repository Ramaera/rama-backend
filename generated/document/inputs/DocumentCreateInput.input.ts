import * as NestJsGraphQL from "@nestjs/graphql";
import { STATUS } from "../../common/enums";
import { UserCreateNestedOneWithoutDocumentsInput } from "../../user/inputs/UserCreateNestedOneWithoutDocumentsInput.input";

@NestJsGraphQL.InputType('DocumentCreateInput', { isAbstract: true })
export class DocumentCreateInput {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  id?: string | undefined;

  @NestJsGraphQL.Field(() => String)
  title!: string;

  @NestJsGraphQL.Field(() => String)
  url!: string;

  @NestJsGraphQL.Field(() => UserCreateNestedOneWithoutDocumentsInput, { nullable: true })
  user?: UserCreateNestedOneWithoutDocumentsInput | undefined;

  @NestJsGraphQL.Field(() => STATUS, { nullable: true })
  status?: "NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED" | undefined;
}
