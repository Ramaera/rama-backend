import { Test, TestingModule } from '@nestjs/testing';
import { ShareholdingService } from './shareholding.service';

describe('ShareholdingService', () => {
  let service: ShareholdingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareholdingService],
    }).compile();

    service = module.get<ShareholdingService>(ShareholdingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
