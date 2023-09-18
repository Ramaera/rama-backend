import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dsc {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
