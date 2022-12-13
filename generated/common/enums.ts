import * as NestJsGraphQL from "@nestjs/graphql";

export enum UserScalarFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  email = "email",
  password = "password",
  name = "name",
  father_or_husband_name = "father_or_husband_name",
  mobile_number = "mobile_number",
  alternate_mobile_number = "alternate_mobile_number",
  kyc = "kyc",
  role = "role",
  membership = "membership",
  date_of_birth = "date_of_birth",
  demat_account = "demat_account",
  private_key = "private_key",
  pw_id = "pw_id",
  rm_id = "rm_id"
}
NestJsGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});

export enum DocumentScalarFieldEnum {
  id = "id",
  title = "title",
  url = "url",
  userId = "userId",
  status = "status"
}
NestJsGraphQL.registerEnumType(DocumentScalarFieldEnum, {
  name: "DocumentScalarFieldEnum",
  description: undefined,
});

export enum SortOrder {
  asc = "asc",
  desc = "desc"
}
NestJsGraphQL.registerEnumType(SortOrder, {
  name: "SortOrder",
  description: undefined,
});

export enum QueryMode {
  "default" = "default",
  insensitive = "insensitive"
}
NestJsGraphQL.registerEnumType(QueryMode, {
  name: "QueryMode",
  description: undefined,
});
