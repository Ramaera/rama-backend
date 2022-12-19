import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class nominee {
 
@Field()
  name: string;
  @Field()
  relatiosnhip: string;
}