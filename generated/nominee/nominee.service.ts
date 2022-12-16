import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class NomineeService {
  constructor(private prisma: PrismaService) { }

  async findFirst(args: Prisma.NomineeFindFirstArgs) {
    return await this.prisma.nominee.findFirst(args)
  }

  findUnique(args: Prisma.NomineeFindUniqueArgs) {
    return this.prisma.nominee.findUnique(args)
  }

  findMany(args: Prisma.NomineeFindManyArgs) {
    return this.prisma.nominee.findMany(args)
  }

  groupBy(args: Prisma.NomineeGroupByArgs) {
    // @ts-ignore
    return this.prisma.nominee.groupBy(args)
  }

  aggregate(args: Prisma.NomineeAggregateArgs) {
    return this.prisma.nominee.aggregate(args)
  }

  create(args: Prisma.NomineeCreateArgs) {
    return this.prisma.nominee.create(args)
  }

  createMany(args: Prisma.NomineeCreateManyArgs) {
    return this.prisma.nominee.createMany(args)
  }

  update(args: Prisma.NomineeUpdateArgs) {
    return this.prisma.nominee.update(args)
  }

  updateMany(args: Prisma.NomineeUpdateManyArgs) {
    return this.prisma.nominee.updateMany(args)
  }

  upsert(args: Prisma.NomineeUpsertArgs) {
    return this.prisma.nominee.upsert(args)
  }

  delete(args: Prisma.NomineeDeleteArgs) {
    return this.prisma.nominee.delete(args)
  }

  deleteMany(args: Prisma.NomineeDeleteManyArgs) {
    return this.prisma.nominee.deleteMany(args)
  }
}
