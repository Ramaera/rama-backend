import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { STATUS, TYPE } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateSalesPerson {
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;
  @Field(() => String)
  mobileNumber: string;
  @Field(() => [GraphQLJSONObject])
  address?: any[];
  @Field(() => [GraphQLJSONObject])
  extraInfo?: any[];

  @Field(() => String)
  agencyCode: string;
  @Field(() => TYPE)
  type: TYPE;

  @Field(() => STATUS)
  approvalStatus?: STATUS;
}

registerEnumType(STATUS, {
  name: 'STATUS',
});

registerEnumType(TYPE, {
  name: 'TYPE',
});
