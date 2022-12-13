import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) { }

  async findFirst(args: Prisma.DocumentFindFirstArgs) {
    return await this.prisma.document.findFirst(args)
  }

  findUnique(args: Prisma.DocumentFindUniqueArgs) {
    return this.prisma.document.findUnique(args)
  }

  findMany(args: Prisma.DocumentFindManyArgs) {
    return this.prisma.document.findMany(args)
  }

  groupBy(args: Prisma.DocumentGroupByArgs) {
    // @ts-ignore
    return this.prisma.document.groupBy(args)
  }

  aggregate(args: Prisma.DocumentAggregateArgs) {
    return this.prisma.document.aggregate(args)
  }

  create(args: Prisma.DocumentCreateArgs) {
    return this.prisma.document.create(args)
  }

  createMany(args: Prisma.DocumentCreateManyArgs) {
    return this.prisma.document.createMany(args)
  }

  update(args: Prisma.DocumentUpdateArgs) {
    return this.prisma.document.update(args)
  }

  updateMany(args: Prisma.DocumentUpdateManyArgs) {
    return this.prisma.document.updateMany(args)
  }

  upsert(args: Prisma.DocumentUpsertArgs) {
    return this.prisma.document.upsert(args)
  }

  delete(args: Prisma.DocumentDeleteArgs) {
    return this.prisma.document.delete(args)
  }

  deleteMany(args: Prisma.DocumentDeleteManyArgs) {
    return this.prisma.document.deleteMany(args)
  }
}
