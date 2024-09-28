import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Projects {
  @Field(() => String, {
    description: 'Project Name',
    nullable: true,
  })
  projectName?: string;

  @Field(() => String, {
    description: 'Total amount Invested ',
    nullable: true,
  })
  totalInvestedAmountinProject?: string;
}

@ObjectType()
export class ProjectEnrolled {
  @Field(() => String, { description: 'Example field (placeholder)' })
  userId?: string;

  @Field(() => User)
  user?: User | null;

  @Field(() => String, {
    nullable: true,
  })
  userName?: string;

  @Field(() => [Projects], { nullable: true })
  projects?: Projects[];
}

@ObjectType()
export class ProjectEnrolledForAllUser {
  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => String, {
    description: 'Project Name',
    nullable: true,
  })
  projectName?: string;

  @Field(() => String, {
    description: 'Project Status',
    nullable: true,
  })
  projectStatus?: string;

  @Field(() => String, {
    description: 'Project Name',
    nullable: true,
  })
  totalInvestedAmountinProject?: string;
}
