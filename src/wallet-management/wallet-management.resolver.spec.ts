import { Test, TestingModule } from '@nestjs/testing';
import { WalletManagementResolver } from './wallet-management.resolver';
import { WalletManagementService } from './wallet-management.service';

describe('WalletManagementResolver', () => {
  let resolver: WalletManagementResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletManagementResolver, WalletManagementService],
    }).compile();

    resolver = module.get<WalletManagementResolver>(WalletManagementResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
