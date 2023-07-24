import { Injectable } from '@nestjs/common';
import { CreateShareholdingInput } from './dto/create-shareholding.input';
import { UpdateShareholdingInput } from './dto/update-shareholding.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ShareholdingService {
  constructor(private prisma: PrismaService) {}
  create(inputData: CreateShareholdingInput) {
    const createShareholding = this.prisma.shareHoldingType.create({
      data: {
        InvestmentType: inputData.InvestmentType,
        userId: inputData.userId,
      },
    });
    console.log(createShareholding);

    return createShareholding;
  }

  findAll() {
    return `This action returns all shareholding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shareholding`;
  }

  update(id: string, updateShareholdingInput: UpdateShareholdingInput) {
    return `This action updates a #${id} shareholding`;
  }

  remove(id: number) {
    return `This action removes a #${id} shareholding`;
  }
}
