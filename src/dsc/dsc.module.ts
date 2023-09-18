import { Module } from '@nestjs/common';
import { DscService } from './dsc.service';
import { DscResolver } from './dsc.resolver';

@Module({
  providers: [DscResolver, DscService]
})
export class DscModule {}
