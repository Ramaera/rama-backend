import { Test, TestingModule } from '@nestjs/testing';
import { RestApisService } from './rest-apis.service';

describe('RestApisService', () => {
  let service: RestApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestApisService],
    }).compile();

    service = module.get<RestApisService>(RestApisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
