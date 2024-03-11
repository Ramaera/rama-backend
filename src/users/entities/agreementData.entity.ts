import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class AgreementData {
  @Field(() => String)
  pwId: string;
  @Field(() => GraphQLJSONObject)
  agreementFieldData: any;
  @Field(() => String, { nullable: true })
  agreementUrl: string;
  @Field(() => Boolean)
  isCompleted: boolean;
}
