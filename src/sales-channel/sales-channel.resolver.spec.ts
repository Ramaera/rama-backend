import { Test, TestingModule } from '@nestjs/testing';
import { SalesChannelResolver } from './sales-channel.resolver';
import { SalesChannelService } from './sales-channel.service';

describe('SalesChannelResolver', () => {
  let resolver: SalesChannelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesChannelResolver, SalesChannelService],
    }).compile();

    resolver = module.get<SalesChannelResolver>(SalesChannelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
