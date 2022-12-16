import * as NestJsGraphQL from "@nestjs/graphql";
import { NomineeCountAggregate } from "./NomineeCountAggregate.output";
import { NomineeMaxAggregate } from "./NomineeMaxAggregate.output";
import { NomineeMinAggregate } from "./NomineeMinAggregate.output";

@NestJsGraphQL.ObjectType('NomineeGroupBy', { isAbstract: true })
export class NomineeGroupBy {
  @NestJsGraphQL.Field(() => String)
  userPw_id!: string;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  name!: string | null;

  @NestJsGraphQL.Field(() => String)
  relationship!: string;

  @NestJsGraphQL.Field(() => NomineeCountAggregate, { nullable: true })
  _count!: NomineeCountAggregate | null;

  @NestJsGraphQL.Field(() => NomineeMinAggregate, { nullable: true })
  _min!: NomineeMinAggregate | null;

  @NestJsGraphQL.Field(() => NomineeMaxAggregate, { nullable: true })
  _max!: NomineeMaxAggregate | null;
}
