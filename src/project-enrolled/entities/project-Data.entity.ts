import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class DataOfProjects {
  @Field(() => String, {
    description: 'Project Name',
    nullable: true,
  })
  totalNumberOfEnrolledProjects?: string;

  @Field(() => [String], {
    description: 'title of Document',
    nullable: true,
  })
  title?: string[];
}
