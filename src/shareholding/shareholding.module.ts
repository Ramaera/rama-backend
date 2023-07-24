import { Module } from '@nestjs/common';
import { ShareholdingService } from './shareholding.service';
import { ShareholdingResolver } from './shareholding.resolver';

@Module({
  providers: [ShareholdingResolver, ShareholdingService]
})
export class ShareholdingModule {}
