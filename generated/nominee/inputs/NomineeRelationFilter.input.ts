import * as NestJsGraphQL from "@nestjs/graphql";
import { NomineeWhereInput } from "../../nominee/inputs/NomineeWhereInput.input";

@NestJsGraphQL.InputType('NomineeRelationFilter', { isAbstract: true })
export class NomineeRelationFilter {
  @NestJsGraphQL.Field(() => NomineeWhereInput, { nullable: true })
  is?: NomineeWhereInput | undefined;

  @NestJsGraphQL.Field(() => NomineeWhereInput, { nullable: true })
  isNot?: NomineeWhereInput | undefined;
}
