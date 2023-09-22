import { Injectable } from '@nestjs/common';
import { CreateDscInput } from './dto/create-dsc.input';
import { UpdateDscInput } from './dto/update-dsc.input';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class DscService {
  constructor(private prisma: PrismaService) {}

  create(createDscInput: CreateDscInput) {
    return this.prisma.dSCDETAILS.create({
      data: {
        userId: createDscInput.userId,
        DscCreatedDate: createDscInput.DscCreatedDate,
        DscExpiryDate: createDscInput.DscExpiryDate,
        DSCStatus: createDscInput.DSCSTATUS,
      },
    });
  }

  findAll() {
    return `This action returns all dsc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dsc`;
  }

  // update(id: string, updateDscInput: UpdateDscInput) {
  //   return this.prisma.dSCDETAILS.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       metadata: updateDscInput.metaData as Prisma.JsonArray,
  //     },
  //   });
  // }

  remove(id: number) {
    return `This action removes a #${id} dsc`;
  }
}
