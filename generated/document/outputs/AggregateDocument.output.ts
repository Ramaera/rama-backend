import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentCountAggregate } from "./DocumentCountAggregate.output";
import { DocumentMaxAggregate } from "./DocumentMaxAggregate.output";
import { DocumentMinAggregate } from "./DocumentMinAggregate.output";

@NestJsGraphQL.ObjectType('AggregateDocument', { isAbstract: true })
export class AggregateDocument {
  @NestJsGraphQL.Field(() => DocumentCountAggregate, { nullable: true })
  _count!: DocumentCountAggregate | null;

  @NestJsGraphQL.Field(() => DocumentMinAggregate, { nullable: true })
  _min!: DocumentMinAggregate | null;

  @NestJsGraphQL.Field(() => DocumentMaxAggregate, { nullable: true })
  _max!: DocumentMaxAggregate | null;
}
