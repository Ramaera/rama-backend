import * as NestJsGraphQL from "@nestjs/graphql";

export enum STATUS {
  NOT_INITILAIZED = "NOT_INITILAIZED",
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  REJECTED = "REJECTED"
}
NestJsGraphQL.registerEnumType(STATUS, {
  name: "STATUS",
  description: undefined,
});
