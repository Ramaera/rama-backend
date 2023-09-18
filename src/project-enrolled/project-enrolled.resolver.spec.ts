import { Test, TestingModule } from '@nestjs/testing';
import { ProjectEnrolledResolver } from './project-enrolled.resolver';
import { ProjectEnrolledService } from './project-enrolled.service';

describe('ProjectEnrolledResolver', () => {
  let resolver: ProjectEnrolledResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectEnrolledResolver, ProjectEnrolledService],
    }).compile();

    resolver = module.get<ProjectEnrolledResolver>(ProjectEnrolledResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
