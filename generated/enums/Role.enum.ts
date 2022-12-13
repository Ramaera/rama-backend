import * as NestJsGraphQL from "@nestjs/graphql";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}
NestJsGraphQL.registerEnumType(Role, {
  name: "Role",
  description: undefined,
});
