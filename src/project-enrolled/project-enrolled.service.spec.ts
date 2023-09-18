import { Test, TestingModule } from '@nestjs/testing';
import { ProjectEnrolledService } from './project-enrolled.service';

describe('ProjectEnrolledService', () => {
  let service: ProjectEnrolledService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectEnrolledService],
    }).compile();

    service = module.get<ProjectEnrolledService>(ProjectEnrolledService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
