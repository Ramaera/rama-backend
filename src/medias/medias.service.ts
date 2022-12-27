import { Injectable } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { DocumentIdArgs } from 'src/documents/args/document-id.args';


@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  // CRUD operations
  uploadSinglefile(){
    return `This Action will upload Media`
  }
}
