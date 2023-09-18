import { Module } from '@nestjs/common';
import { ProjectEnrolledService } from './project-enrolled.service';
import { ProjectEnrolledResolver } from './project-enrolled.resolver';

@Module({
  providers: [ProjectEnrolledResolver, ProjectEnrolledService]
})
export class ProjectEnrolledModule {}
