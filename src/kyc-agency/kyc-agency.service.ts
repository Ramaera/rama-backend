import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKycAgencyCodeInput } from './dto/create-kyc-agency.input';
import { UpdateKycAgencyInput } from './dto/update-kyc-agency.input';
import { PrismaService } from 'nestjs-prisma';
import {
  GetAllUserofSpecificKycAgency,
  GetKycAgency,
} from './dto/get-kyc-agency.input';
import { error } from 'console';
// import { getKycAgency } from './dto/get-kyc-agency.input';

@Injectable()
export class KycAgencyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateKycAgencyCodeInput) {
    try {
      const checkAgencyCode = await this.prisma.kycAgency.findFirst({
        where: {
          userId: data.userId,
        },
      });
      console.log('checkAgencyCode', checkAgencyCode);

      if (checkAgencyCode) {
        throw new BadRequestException('Agency Code Already Exist');
      }
      const generatedAgencyCode = await this.prisma.kycAgency.create({
        data: {
          agencyCode: `RIL${Math.floor(Math.random() * 90000) + 10000}`,
          userId: data.userId,
        },
      });
      return generatedAgencyCode;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll() {
    return this.prisma.kycAgency.findMany({});
  }

  async findAllKycAgnecyuser(code: GetAllUserofSpecificKycAgency) {
    const listofagencyuser = await this.prisma.user.findMany({
      where: {
        referralAgencyCode: code.agencyCode,
      },
      include: {
        nominee: true,
        documents: true,
        KycAgency: true,
      },
    });
    console.log('listofagencyuser', listofagencyuser);
    return listofagencyuser;
  }

  async findOne(id: GetKycAgency) {
    const agencyDetails = await this.prisma.kycAgency.findFirst({
      where: { userId: id.userId },
      include: {
        user: true,
      },
    });
    if (agencyDetails) {
      return agencyDetails;
    }
    return 'Not Found';
  }

  update(id: number, updateKycAgencyInput: UpdateKycAgencyInput) {
    return `This action updates a #${id} kycAgency`;
  }

  remove(id: number) {
    return `This action removes a #${id} kycAgency`;
  }
}
