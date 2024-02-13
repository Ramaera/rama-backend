import { Test, TestingModule } from '@nestjs/testing';
import { SalesChannelService } from './sales-channel.service';

describe('SalesChannelService', () => {
  let service: SalesChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesChannelService],
    }).compile();

    service = module.get<SalesChannelService>(SalesChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
