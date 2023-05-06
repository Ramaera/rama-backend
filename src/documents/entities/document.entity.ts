import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @Field()
  title: string;
  @Field()
  url: string;
  @Field()
  id: string;

  @Field()
  status: string;
}
