import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Projects {
  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  projectName: string;

  @Field(() => String, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  totalInvestedAmount: string;
}

@ObjectType()
export class ProjectEnrolled {
  @Field(() => String, { description: 'Example field (placeholder)' })
  userId: number;

  @Field(() => String, {
    nullable: true,
  })
  userName: string;

  @Field(() => [Projects], { nullable: true })
  projects?: Projects[];
}
