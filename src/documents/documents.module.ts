import { Module } from '@nestjs/common';
import { DocumentsResolver } from './documents.resolver';
import { DocumentsService } from './documents.service';

@Module({
  imports: [],
  providers: [DocumentsResolver,DocumentsService],
})
export class DocumentsModule {}
