import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectEnrolledService } from './project-enrolled.service';
import { ProjectEnrolled, Projects } from './entities/project-enrolled.entity';
// import {Projects }
import {
  CreateProjectEnrolledInput,
  projectDataInput,
} from './dto/create-project-enrolled.input';
import { UpdateProjectEnrolledInput } from './dto/update-project-enrolled.input';
import { User } from 'src/users/models/user.model';

@Resolver(() => ProjectEnrolled)
export class ProjectEnrolledResolver {
  constructor(
    private readonly projectEnrolledService: ProjectEnrolledService
  ) {}

  @Query(() => ProjectEnrolled)
  FeedProjectEnrolled() {
    // createProjectEnrolledInput: CreateProjectEnrolledInput // @Args('createProjectEnrolledInput')
    return this.projectEnrolledService.create();
  }

  @Mutation(() => ProjectEnrolled)
  createProjectEnrolled(
    @Args('projectData')
    projectData: projectDataInput
  ) {
    return this.projectEnrolledService.createlive(projectData);
  }

  @Query(() => [ProjectEnrolled], { name: 'allprojectEnrolleds' })
  findAll() {
    return this.projectEnrolledService.findAll();
  }

  @Query(() => [Projects], { name: 'projectEnrolled' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.projectEnrolledService.findOne(id);
  }

  @Mutation(() => ProjectEnrolled)
  updateProjectEnrolled(
    @Args('updateProjectEnrolledInput')
    updateProjectEnrolledInput: UpdateProjectEnrolledInput
  ) {
    return this.projectEnrolledService.update(
      updateProjectEnrolledInput.id,
      updateProjectEnrolledInput
    );
  }

  @Query(() => [User])
  findUsersinProject(@Args('projectName') projectName: string) {
    return this.projectEnrolledService.findUsers(projectName);
  }

  @Mutation(() => ProjectEnrolled)
  removeProjectEnrolled(@Args('id', { type: () => Int }) id: number) {
    return this.projectEnrolledService.remove(id);
  }
}
