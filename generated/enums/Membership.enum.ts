import * as NestJsGraphQL from "@nestjs/graphql";

export enum Membership {
  BASIC = "BASIC",
  ADVANCE = "ADVANCE"
}
NestJsGraphQL.registerEnumType(Membership, {
  name: "Membership",
  description: undefined,
});
