import * as NestJsGraphQL from "@nestjs/graphql";
import { STATUS } from "../../common/enums";

@NestJsGraphQL.InputType('DocumentCreateWithoutUserInput', { isAbstract: true })
export class DocumentCreateWithoutUserInput {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  id?: string | undefined;

  @NestJsGraphQL.Field(() => String)
  title!: string;

  @NestJsGraphQL.Field(() => String)
  url!: string;

  @NestJsGraphQL.Field(() => STATUS, { nullable: true })
  status?: "NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED" | undefined;
}
