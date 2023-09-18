import { CreateProjectEnrolledInput } from './create-project-enrolled.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectEnrolledInput extends PartialType(CreateProjectEnrolledInput) {
  @Field(() => Int)
  id: number;
}
