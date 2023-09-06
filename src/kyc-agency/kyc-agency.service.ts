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
      if (checkAgencyCode) {
        throw new BadRequestException('Agency Code Already Exist');
      }
      const generatedAgencyCode = await this.prisma.kycAgency.create({
        data: {
          agencyCode: `RLI${Math.floor(Math.random() * 90000) + 10000}`,
          userId: data.userId,
        },
      });
      return generatedAgencyCode;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    const check = await this.prisma.kycAgency.findMany({
      include: {
        user: true,
      },
    });
    return check;
  }

  async agencyPayment(userId) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    let agencyPwid = user.pw_id;
    const agencyCodeOutput = await this.prisma.kycAgency.findFirst({
      where: {
        userId: userId,
      },
    });

    let agencyCode = agencyCodeOutput.agencyCode;
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

  async findReport() {
    // const checkreport = await this.prisma.kycAgency.findMany({});
    let total = 0;

    const doc = await this.prisma.document.findMany({
      where: {
        AND: [
          {
            title: { contains: 'agra' },
            status: { not: 'REJECTED' },
            user: {
              referralAgencyCode: {
                contains: 'RLI',
              },
            },
          },
        ],
        OR: [
          {
            createdAt: {
              gte: '2023-08-26T00:00:00.000Z',
              lte: '2023-09-01T23:59:00.000Z',
            },
          },
          {
            updatedAt: {
              gte: '2023-08-26T00:00:00.000Z',
              lte: '2023-09-01T23:59:00.000Z',
            },
          },
        ],
      },
      include: {
        user: true,
      },
    });

    console.log('--->>>', doc.length);
    let total_amount = 0;
    doc.map(async (dd) => {
      const user = await this.prisma.user.findFirst({
        where: {
          id: dd.userId,
        },
      });

      const am = await this.prisma.document.findMany({
        where: {
          id: dd.id,
        },
      });
      console.log('--->>', am.length, user.referralAgencyCode);
      am.map((amount_total) => {
        console.log(
          '----->>Hajipur Details',
          amount_total.amount,
          amount_total.title,
          user.referralAgencyCode,
          user.pw_id
        );
      });

      // total_amount += dd.amount;
      // console.log(
      //   '345678--->>>>',
      //   total_amount,
      //   dd.amount,
      //   dd.title,
      //   user.pw_id,
      //   user.referralAgencyCode
      // );
    });

    // checkreport.map(async (agency) => {
    //   console.log(agency.agencyCode);

    let totalUser;
    // const checkusersList = await this.prisma.user.findMany({
    //   where: {
    //     referralAgencyCode: agency.agencyCode,
    //   },
    // });

    // checkusersList.map(async (users) => {
    //   const docwithpay = await this.prisma.document.findMany({
    //     where: {
    //       AND: [
    //         {
    //           title: { contains: 'hajipur' },
    //           createdAt: {
    //             gte: '2023-08-26T00:00:00.000Z',
    //             lte: '2023-09-01T23:59:00.000Z',
    //           },
    //         },
    //       ],
    //     },
    //   });
    //   total += 1;
    // });

    // const checkuserinsideAGENCY = await this.prisma.user.findMany({
    //   where: {
    //     AND: [
    //       {
    //         referralAgencyCode: agency.agencyCode,
    //         createdAt: {
    //           gte: '2023-08-26T00:00:00.000Z',
    //           lte: '2023-09-01T23:59:00.000Z',
    //         },
    //       },
    //     ],
    //   },
    //   include: {
    //     documents: true,
    //   },
    //   // });
    // });
    // console.log('total hajipur doc', total);

    // console.log('---->>>', checkreport);
  }

  update(id: number, updateKycAgencyInput: UpdateKycAgencyInput) {
    return `This action updates a #${id} kycAgency`;
  }

  remove(id: number) {
    return `This action removes a #${id} kycAgency`;
  }
}
