import { Test, TestingModule } from '@nestjs/testing';
import { DscResolver } from './dsc.resolver';
import { DscService } from './dsc.service';

describe('DscResolver', () => {
  let resolver: DscResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DscResolver, DscService],
    }).compile();

    resolver = module.get<DscResolver>(DscResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
