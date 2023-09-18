import { Test, TestingModule } from '@nestjs/testing';
import { DscService } from './dsc.service';

describe('DscService', () => {
  let service: DscService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DscService],
    }).compile();

    service = module.get<DscService>(DscService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
