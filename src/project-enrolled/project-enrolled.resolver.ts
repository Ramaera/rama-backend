import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectEnrolledService } from './project-enrolled.service';
import { ProjectEnrolled } from './entities/project-enrolled.entity';
import { CreateProjectEnrolledInput } from './dto/create-project-enrolled.input';
import { UpdateProjectEnrolledInput } from './dto/update-project-enrolled.input';

@Resolver(() => ProjectEnrolled)
export class ProjectEnrolledResolver {
  constructor(private readonly projectEnrolledService: ProjectEnrolledService) {}

  @Mutation(() => ProjectEnrolled)
  createProjectEnrolled(@Args('createProjectEnrolledInput') createProjectEnrolledInput: CreateProjectEnrolledInput) {
    return this.projectEnrolledService.create(createProjectEnrolledInput);
  }

  @Query(() => [ProjectEnrolled], { name: 'projectEnrolled' })
  findAll() {
    return this.projectEnrolledService.findAll();
  }

  @Query(() => ProjectEnrolled, { name: 'projectEnrolled' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectEnrolledService.findOne(id);
  }

  @Mutation(() => ProjectEnrolled)
  updateProjectEnrolled(@Args('updateProjectEnrolledInput') updateProjectEnrolledInput: UpdateProjectEnrolledInput) {
    return this.projectEnrolledService.update(updateProjectEnrolledInput.id, updateProjectEnrolledInput);
  }

  @Mutation(() => ProjectEnrolled)
  removeProjectEnrolled(@Args('id', { type: () => Int }) id: number) {
    return this.projectEnrolledService.remove(id);
  }
}
