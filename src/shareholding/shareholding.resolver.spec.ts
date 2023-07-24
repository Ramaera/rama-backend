import { Test, TestingModule } from '@nestjs/testing';
import { ShareholdingResolver } from './shareholding.resolver';
import { ShareholdingService } from './shareholding.service';

describe('ShareholdingResolver', () => {
  let resolver: ShareholdingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareholdingResolver, ShareholdingService],
    }).compile();

    resolver = module.get<ShareholdingResolver>(ShareholdingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
