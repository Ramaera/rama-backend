import { Injectable } from '@nestjs/common';
import { CreateDscInput } from './dto/create-dsc.input';
import { UpdateDscInput } from './dto/update-dsc.input';
import { PrismaService } from 'nestjs-prisma';

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

  update(id: number, updateDscInput: UpdateDscInput) {
    return `This action updates a #${id} dsc`;
  }

  remove(id: number) {
    return `This action removes a #${id} dsc`;
  }
}
