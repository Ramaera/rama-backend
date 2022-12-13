import * as NestJsGraphQL from "@nestjs/graphql";
import { STATUS } from "@prisma/client";
import { DocumentCountAggregate } from "./DocumentCountAggregate.output";
import { DocumentMaxAggregate } from "./DocumentMaxAggregate.output";
import { DocumentMinAggregate } from "./DocumentMinAggregate.output";

@NestJsGraphQL.ObjectType('DocumentGroupBy', { isAbstract: true })
export class DocumentGroupBy {
  @NestJsGraphQL.Field(() => String)
  id!: string;

  @NestJsGraphQL.Field(() => String)
  title!: string;

  @NestJsGraphQL.Field(() => String)
  url!: string;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  userId!: string | null;

  @NestJsGraphQL.Field(() => STATUS)
  status!: "NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED";

  @NestJsGraphQL.Field(() => DocumentCountAggregate, { nullable: true })
  _count!: DocumentCountAggregate | null;

  @NestJsGraphQL.Field(() => DocumentMinAggregate, { nullable: true })
  _min!: DocumentMinAggregate | null;

  @NestJsGraphQL.Field(() => DocumentMaxAggregate, { nullable: true })
  _max!: DocumentMaxAggregate | null;
}
