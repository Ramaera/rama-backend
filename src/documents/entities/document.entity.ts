import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Document {
 
@Field()
  title: string;
  @Field()
  url: string;
}