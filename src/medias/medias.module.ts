import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { MediasController } from './medias.controller';


@Module({
  controllers: [MediasController],
  providers:[],
  imports:[PrismaModule]

})
export class MediasModule {}
