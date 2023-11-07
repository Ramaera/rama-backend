import { Module } from '@nestjs/common';
import { RestApisService } from './rest-apis.service';
import { RestApisController } from './rest-apis.controller';

@Module({
  controllers: [RestApisController],
  providers: [RestApisService]
})
export class RestApisModule {}
