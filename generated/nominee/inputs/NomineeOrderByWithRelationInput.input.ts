import * as NestJsGraphQL from "@nestjs/graphql";
import { SortOrder } from "../../common/enums";
import { UserOrderByWithRelationInput } from "../../user/inputs/UserOrderByWithRelationInput.input";

@NestJsGraphQL.InputType('NomineeOrderByWithRelationInput', { isAbstract: true })
export class NomineeOrderByWithRelationInput {
  @NestJsGraphQL.Field(() => UserOrderByWithRelationInput, { nullable: true })
  user?: UserOrderByWithRelationInput | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  userPw_id?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  name?: "asc" | "desc" | undefined;

  @NestJsGraphQL.Field(() => SortOrder, { nullable: true })
  relationship?: "asc" | "desc" | undefined;
}
