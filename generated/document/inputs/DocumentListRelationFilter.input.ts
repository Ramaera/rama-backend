import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentWhereInput } from "../../document/inputs/DocumentWhereInput.input";

@NestJsGraphQL.InputType('DocumentListRelationFilter', { isAbstract: true })
export class DocumentListRelationFilter {
  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  every?: DocumentWhereInput | undefined;

  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  some?: DocumentWhereInput | undefined;

  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  none?: DocumentWhereInput | undefined;
}
