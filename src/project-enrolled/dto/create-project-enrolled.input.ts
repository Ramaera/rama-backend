import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectEnrolledInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
