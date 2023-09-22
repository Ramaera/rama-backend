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
        userPWId: inputData.userPWId,
        allotedShare: inputData.allotedShare,
        userId: inputData.userId,
      },
    });
    return createShareholding;
  }

  // async findAll(): Promise<any[]> {
  //   const result = await this.prisma.shareHoldingType.groupBy({
  //     by: ['userPWId'],
  //     _count: {
  //       InvestmentType: true,
  //     },
  //   });

  //   return result.map((item) => ({
  //     userPWId: item.userPWId,
  //     investmentTypeCount: item._count.InvestmentType,
  //   }));
  // }

  findOne(id: number) {
    return `This action returns a #${id} shareholding`;
  }

  update(id: string, input: UpdateShareholdingInput) {
    return this.prisma.shareHoldingType.update({
      data: {
        allotedShare: input.allotedShare,
        InvestmentType: input.InvestmentType,
      },
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} shareholding`;
  }
}
