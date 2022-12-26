import { Module } from '@nestjs/common';
import { MediasController } from './medias.controller';

@Module({
  controllers: [MediasController]
})
export class MediasModule {}
