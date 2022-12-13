import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { DocumentResolver } from './document.resolver'
import { DocumentService } from './document.service'

@Module({
  providers: [DocumentResolver, DocumentService, PrismaService]
})
export class DocumentModule { }

