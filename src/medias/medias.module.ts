import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { MediasController } from './medias.controller';
import { MediaService } from './medias.service';

@Module({
  controllers: [MediasController],
  providers:[MediaService],
  imports:[PrismaModule]

})
export class MediasModule {}
