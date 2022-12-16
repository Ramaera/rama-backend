import * as NestJsGraphQL from "@nestjs/graphql";
import { STATUS } from "@prisma/client";

@NestJsGraphQL.ObjectType('DocumentMinAggregate', { isAbstract: true })
export class DocumentMinAggregate {
  @NestJsGraphQL.Field(() => String, { nullable: true })
  id!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  title!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  url!: string | null;

  @NestJsGraphQL.Field(() => String, { nullable: true })
  userId!: string | null;

  @NestJsGraphQL.Field(() => STATUS, { nullable: true })
  status!: "NOT_INITILAIZED" | "PENDING" | "SUBMITTED" | "REJECTED" | null;
}
