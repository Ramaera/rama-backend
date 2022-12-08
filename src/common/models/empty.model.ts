import {  ObjectType, ID, Field } from '@nestjs/graphql';

@ObjectType()
export abstract class EmptyModal {
  @Field()
  message?: string;
}
