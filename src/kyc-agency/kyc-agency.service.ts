import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateKycAgencyCodeInput } from './dto/create-kyc-agency.input';
import { UpdateKycAgencyInput } from './dto/update-kyc-agency.input';
import { PrismaService } from 'nestjs-prisma';
import {
  GetAllUserofSpecificKycAgency,
  GetKycAgency,
} from './dto/get-kyc-agency.input';
import { error } from 'console';
import { prisma } from '@prisma/client';
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

  async findAll() {
    console.log('clicked');
    const check = await this.prisma.kycAgency.findMany({
      include: {
        user: true,
      },
    });
    console.log('---', check);
    return check;
  }

  async agencyPayment(userId) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    console.log(user.name, user.pw_id);
    let agencyPwid = user.pw_id;
    const agencyCodeOutput = await this.prisma.kycAgency.findFirst({
      where: {
        userId: userId,
      },
    });

    let agencyCode = agencyCodeOutput.agencyCode;
    console.log(user.name, user.pw_id, agencyCode);

    const agencyUsers = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            referralAgencyCode: agencyPwid,
          },
          {
            referralAgencyCode: agencyCode,
          },
        ],
      },
      include: {
        documents: true,
      },
    });
    let KYCPayout = 0;
    let HajipurPayout = 0;
    let AgraPayout = 0;
    // let AdvancePayout=0

    agencyUsers.map((agencyUser) => {
      agencyUser.kyc === 'APPROVED' ? (KYCPayout += 200) : (KYCPayout = 0);
      agencyUser.documents.map((document) => {
        document.title === 'payment_proof'
          ? console.log('hii')
          : console.log('noo');
      });
    });
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
