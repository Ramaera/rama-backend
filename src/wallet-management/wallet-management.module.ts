import { Module } from '@nestjs/common';
import { WalletManagementService } from './wallet-management.service';
import { WalletManagementResolver } from './wallet-management.resolver';

@Module({
  providers: [WalletManagementResolver, WalletManagementService],
})
export class WalletManagementModule {}
