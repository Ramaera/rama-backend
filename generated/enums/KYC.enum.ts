import * as NestJsGraphQL from "@nestjs/graphql";

export enum KYC {
  NOT_INITIALIZED = "NOT_INITIALIZED",
  SUBMITTED = "SUBMITTED",
  ONGOING = "ONGOING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED"
}
NestJsGraphQL.registerEnumType(KYC, {
  name: "KYC",
  description: undefined,
});
