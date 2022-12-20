import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Nominee {
 
  @Field()
  name: string;
  @Field()
  relationship: string;
}