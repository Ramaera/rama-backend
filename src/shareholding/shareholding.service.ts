import { Injectable } from '@nestjs/common';
import { CreateShareholdingInput } from './dto/create-shareholding.input';
import { UpdateShareholdingInput } from './dto/update-shareholding.input';
import { PrismaService } from 'nestjs-prisma';
import { SearchInvestmentType } from './dto/search-shareholding.input';

@Injectable()
export class ShareholdingService {
  constructor(private prisma: PrismaService) {}
  async create(inputData: CreateShareholdingInput) {
    const CheckUserExist = await this.prisma.user.findUnique({
      where: {
        pw_id: inputData.userPWId,
      },
    });
    if (CheckUserExist) {
      const createShareholding = this.prisma.shareHoldingType.create({
        data: {
          InvestmentType: inputData.InvestmentType,
          userPWId: inputData.userPWId,
          allotedShare: inputData.allotedShare,
          userId: CheckUserExist.id,
        },
      });

      return createShareholding;
    }
  }

  async findAll(searchData: SearchInvestmentType, { skip, take }) {
    if (searchData.searchProject) {
      const ShareHolderData = this.prisma.shareHoldingType.findMany({
        take,
        skip,
        where: {
          InvestmentType: {
            contains: searchData.searchProject,
            mode: 'insensitive',
          },
        },
        include: {
          user: true,
        },
      });
      return ShareHolderData;
    }
    if (searchData.searchMembership) {
      const ShareHolderData = this.prisma.shareHoldingType.findMany({
        take,
        skip,
        where: {
          user: {
            membership: searchData.searchMembership,
          },
        },
        include: {
          user: true,
        },
      });
      return ShareHolderData;
    }
  }

  findShareholders({ take, skip }) {
    return this.prisma.shareHoldingType.findMany({ take, skip });
  }

  async findOne(id: string) {
    return await this.prisma.shareHoldingType.findMany({
      where: {
        userId: id,
      },
    });
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
