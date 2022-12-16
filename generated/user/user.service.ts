import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findFirst(args: Prisma.UserFindFirstArgs) {
    return await this.prisma.user.findFirst(args)
  }

  findUnique(args: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(args)
  }

  findMany(args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(args)
  }

  groupBy(args: Prisma.UserGroupByArgs) {
    // @ts-ignore
    return this.prisma.user.groupBy(args)
  }

  aggregate(args: Prisma.UserAggregateArgs) {
    return this.prisma.user.aggregate(args)
  }

  create(args: Prisma.UserCreateArgs) {
    return this.prisma.user.create(args)
  }

  createMany(args: Prisma.UserCreateManyArgs) {
    return this.prisma.user.createMany(args)
  }

  update(args: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(args)
  }

  updateMany(args: Prisma.UserUpdateManyArgs) {
    return this.prisma.user.updateMany(args)
  }

  upsert(args: Prisma.UserUpsertArgs) {
    return this.prisma.user.upsert(args)
  }

  delete(args: Prisma.UserDeleteArgs) {
    return this.prisma.user.delete(args)
  }

  deleteMany(args: Prisma.UserDeleteManyArgs) {
    return this.prisma.user.deleteMany(args)
  }
}
