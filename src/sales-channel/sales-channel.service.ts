import { Injectable } from '@nestjs/common';
import { CreateSalesChannelInput } from './dto/create-sales-channel.input';
import { UpdateSalesChannelInput } from './dto/update-sales-channel.input';
import { CreateSalesPerson } from 'src/kyc-agency/dto/create-salesPerson.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SalesChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalesPerson(data: CreateSalesPerson) {
    const salesUser = await this.prisma.salesPerson.create({
      data: {
        kycAgencycode: data.agencyCode,
        approvalStatus: data.approvalStatus,
        name: data.name,
        type: data.type,
        email: data.email,
        mobileNumber: data.mobileNumber,
        address: data.address,
        extraInfo: data.extraInfo,
      },
    });
    return salesUser;
  }

  create(createSalesChannelInput: CreateSalesChannelInput) {
    return 'This action adds a new salesChannel';
  }

  findAll() {
    return `This action returns all salesChannel`;
  }

  findOne(agencyCode: string) {
    return this.prisma.salesPerson.findMany({
      where: {
        kycAgencycode: agencyCode,
      },
    });
  }

  update(id: number, updateSalesChannelInput: UpdateSalesChannelInput) {
    return `This action updates a #${id} salesChannel`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesChannel`;
  }
}
