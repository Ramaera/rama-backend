import { Module } from '@nestjs/common';
import { SalesChannelService } from './sales-channel.service';
import { SalesChannelResolver } from './sales-channel.resolver';

@Module({
  providers: [SalesChannelResolver, SalesChannelService]
})
export class SalesChannelModule {}
