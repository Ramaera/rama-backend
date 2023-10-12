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
import { get } from 'http';
// import { getKycAgency } from './dto/get-kyc-agency.input';

function getMonthDates(monthNumber) {
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Calculate the first day of the specified month
  const startDate = new Date(
    Date.UTC(currentYear, monthNumber - 1, 1, 0, 0, 0)
  );

  // Calculate the last day of the month by going to the first day of the next month and subtracting one day
  const nextMonth = (monthNumber % 12) + 1;
  const nextYear = nextMonth === 1 ? currentYear + 1 : currentYear;
  const endDate = new Date(Date.UTC(nextYear, nextMonth - 1, 1, 0, 0, 0) - 1);

  return {
    startDate, // Leave it as a Date object
    endDate, // Get endDate in YYYY-MM-DD format
  };
}

function parseCustomDate(dateString) {
  const parts = dateString.split(', ');
  if (parts.length !== 2) {
    throw new Error('Invalid date format');
  }

  const datePart = parts[0];
  const timePart = parts[1];

  const [month, day, year] = datePart.split('/');
  const [time, ampm] = timePart.split(' ');
  const [hour, minute, second] = time.split(':');

  // Adjust hours if it's PM
  let adjustedHour = parseInt(hour, 10);
  if (ampm === 'PM' && adjustedHour !== 12) {
    adjustedHour += 12;
  }

  // Create a Date object
  const date = new Date(year, month - 1, day, adjustedHour, minute, second);

  return date;
}

// Example usage

@Injectable()
export class KycAgencyService {
  constructor(private prisma: PrismaService) {}

  async findAgency(agencyCode) {
    try {
      console.log('Before');
      const AgencyHolder = await this.prisma.kycAgency.findUnique({
        where: {
          agencyCode: agencyCode.toLocaleUpperCase(),
        },
        include: {
          user: true,
        },
      });

      if (!AgencyHolder) {
        throw new BadRequestException('Agency Code is Not Valid');
      }
      return AgencyHolder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

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

  // async totalKycInaMonth(month) {
  //   const getData = getMonthDates(month);

  //   // Total Kyc Joined in A  Specific Month

  //   // const kycJoined = await this.prisma.user.findMany({
  //   //   where: {
  //   //     createdAt: {
  //   //       gte: getData.startDate,
  //   //       lte: getData.endDate,
  //   //     },
  //   //   },
  //   // });
  //   // parseCustomDate();

  //   // Total Kyc Joined &  Approved ( with Demat Document in a Specific Month)

  //   // const kycJoinedAndApprovedWithDemat = await this.prisma.user.findMany({
  //   //   where: {
  //   //     AND: [
  //   //       {
  //   //         createdAt: {
  //   //           gte: getData.startDate,
  //   //           lte: getData.endDate,
  //   //         },
  //   //         documents: {
  //   //           some: {
  //   //             createdAt: {
  //   //               gte: getData.startDate,
  //   //               lte: getData.endDate,
  //   //             },
  //   //             approvalDate: {
  //   //               gte: getData.startDate.toLocaleString(),
  //   //               lte: getData.startDate.toLocaleString(),
  //   //             },
  //   //             title: 'demat_document',
  //   //             status: 'APPROVED',
  //   //           },
  //   //         },
  //   //       },
  //   //     ],
  //   //   },
  //   // });

  //   //   Totak Kyc Approved in specifc Month (include Previous Month Not Approved KYC (without Demat))
  //   // const kycApprovedWithDemat = await this.prisma.user.findMany({
  //   //   where: {
  //   //     AND: [
  //   //       {
  //   //         documents: {
  //   //           some: {
  //   //             approvalDate: {
  //   //               gte: getData.startDate.toLocaleString(),
  //   //               lte: getData.startDate.toLocaleString(),
  //   //             },
  //   //             title: 'demat_document',
  //   //             status: 'APPROVED',
  //   //           },
  //   //         },
  //   //       },
  //   //     ],
  //   //   },
  //   // });

  //   //   Totak Kyc Joined & Pending in specifc Month
  //   // const kycJoinedAndPendingWithDemat = await this.prisma.user.findMany({
  //   //   where: {
  //   //     AND: [
  //   //       {
  //   //         createdAt: {
  //   //           gte: getData.startDate,
  //   //           lte: getData.endDate,
  //   //         },
  //   //         documents: {
  //   //           some: {
  //   //             title: 'demat_document',
  //   //             status: 'PENDING',
  //   //           },
  //   //         },
  //   //       },
  //   //     ],
  //   //     OR: [
  //   //       {
  //   //         createdAt: {
  //   //           gte: getData.startDate,
  //   //           lte: getData.endDate,
  //   //         },
  //   //         NOT: {
  //   //           documents: {
  //   //             some: {
  //   //               title: 'demat_document',
  //   //             },
  //   //           },
  //   //         },
  //   //       },
  //   //     ],
  //   //   },
  //   // });

  //   // //  Total Kyc Approved in a Month
  //   // const kycFinalBASICApproval = await this.prisma.user.findMany({
  //   //   where: {
  //   //     kyc: 'APPROVED',
  //   //     membership: 'BASIC',
  //   //     documents: {
  //   //       some: {
  //   //         title: {
  //   //           contains: 'demat_document',
  //   //         },
  //   //         approvalDate: {
  //   //           gte: getData.startDate.toLocaleString(),
  //   //           lte: getData.endDate.toLocaleString(),
  //   //         },
  //   //       },
  //   //     },
  //   //   },
  //   //   include: {
  //   //     documents: true,
  //   //   },
  //   // });

  //   // const kycFinalADVANCEApproval = await this.prisma.user.findMany({
  //   //   where: {
  //   //     kyc: 'APPROVED',
  //   //     membership: 'ADVANCE',
  //   //     documents: {
  //   //       some: {
  //   //         title: {
  //   //           contains: 'demat_document',
  //   //         },
  //   //         approvalDate: {
  //   //           gte: getData.startDate.toLocaleString(),
  //   //           lte: getData.endDate.toLocaleString(),
  //   //         },
  //   //       },
  //   //     },
  //   //   },
  //   //   include: {
  //   //     documents: true,
  //   //   },
  //   // });

  //   return { kycFinalBASICApproval, kycFinalADVANCEApproval };
  // }

  async totalKycInaMonthByAgencyCode(month, agencyCode) {
    const getData = getMonthDates(month);

    // Total BASIC Kyc Joined in A  Specific Month

    // const kycJoined = await this.prisma.user.findMany({
    //   where: {
    //     createdAt: {
    //       gte: getData.startDate,
    //       lte: getData.endDate,
    //     },
    //   },
    // });
    // parseCustomDate();

    // Total Kyc Joined &  Approved ( with Demat Document in a Specific Month)

    // const kycJoinedAndApprovedWithDemat = await this.prisma.user.findMany({
    //   where: {
    //     AND: [
    //       {
    //         createdAt: {
    //           gte: getData.startDate,
    //           lte: getData.endDate,
    //         },
    //         documents: {
    //           some: {
    //             createdAt: {
    //               gte: getData.startDate,
    //               lte: getData.endDate,
    //             },
    //             approvalDate: {
    //               gte: getData.startDate.toLocaleString(),
    //               lte: getData.startDate.toLocaleString(),
    //             },
    //             title: 'demat_document',
    //             status: 'APPROVED',
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });

    //   Totak Kyc Approved in specifc Month (include Previous Month Not Approved KYC (without Demat))
    // const kycApprovedWithDemat = await this.prisma.user.findMany({
    //   where: {
    //     AND: [
    //       {
    //         documents: {
    //           some: {
    //             approvalDate: {
    //               gte: getData.startDate.toLocaleString(),
    //               lte: getData.startDate.toLocaleString(),
    //             },
    //             title: 'demat_document',
    //             status: 'APPROVED',
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });

    //   Totak Kyc Joined & Pending in specifc Month
    // const kycJoinedAndPendingWithDemat = await this.prisma.user.findMany({
    //   where: {
    //     AND: [
    //       {
    //         createdAt: {
    //           gte: getData.startDate,
    //           lte: getData.endDate,
    //         },
    //         documents: {
    //           some: {
    //             title: 'demat_document',
    //             status: 'PENDING',
    //           },
    //         },
    //       },
    //     ],
    //     OR: [
    //       {
    //         createdAt: {
    //           gte: getData.startDate,
    //           lte: getData.endDate,
    //         },
    //         NOT: {
    //           documents: {
    //             some: {
    //               title: 'demat_document',
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });

    //  Total Kyc Approved in a Month
    const kycFinalBASICApproval = await this.prisma.user.findMany({
      where: {
        kyc: 'APPROVED',
        membership: 'BASIC',
        referralAgencyCode: agencyCode,
        documents: {
          some: {
            title: {
              contains: 'demat_document',
            },
            approvalDate: {
              gte: getData.startDate.toLocaleString(),
              lte: getData.endDate.toLocaleString(),
            },
          },
        },
      },
      include: {
        documents: true,
      },
    });

    kycFinalBASICApproval.map((userKyc) => {
      userKyc.documents.map((document) => {
        document.title.includes('hajipur');
      });
    });
    // Total Advance Kyc Joined in A  Specific Month
    const kycFinalADVANCEApproval = await this.prisma.user.findMany({
      where: {
        kyc: 'APPROVED',
        membership: 'ADVANCE',
        referralAgencyCode: agencyCode,
        documents: {
          some: {
            title: {
              contains: 'demat_document',
            },
            approvalDate: {
              gte: getData.startDate.toLocaleString(),
              lte: getData.endDate.toLocaleString(),
            },
          },
        },
      },
      include: {
        documents: true,
      },
    });
    return { kycFinalBASICApproval, kycFinalADVANCEApproval };
  }

  // async agencyPayment(userId: string) {
  //   const user = await this.prisma.user.findFirst({
  //     where: {
  //       id: userId,
  //     },
  //     include: {
  //       KycAgency: true,
  //     },
  //   });
  //   console.log(user.pw_id, user.KycAgency.agencyCode);

  //   let agencyPwid = user.pw_id;
  //   // const agencyCodeOutput = await this.prisma.kycAgency.findFirst({
  //   //   where: {
  //   //     userId: userId,
  //   //   },
  //   // });

  //   let agencyCode = user.KycAgency.agencyCode;
  //   const agencyUsers = await this.prisma.user.findMany({
  //     where: {
  //       OR: [
  //         {
  //           referralAgencyCode: agencyPwid,
  //           createdAt: {
  //             gte: '',
  //           },
  //         },
  //         {
  //           referralAgencyCode: agencyCode,
  //         },
  //       ],
  //     },
  //     include: {
  //       documents: true,
  //     },
  //   });
  //   let KYCPayout = 0;
  //   let HajipurPayout = 0;
  //   let AgraPayout = 0;
  //   // let AdvancePayout=0

  //   agencyUsers.map((agencyUser) => {
  //     agencyUser.kyc === 'APPROVED' ? (KYCPayout += 200) : (KYCPayout = 0);
  //     agencyUser.documents.map((document) => {
  //       document.title === 'payment_proof'
  //         ? console.log('hii')
  //         : console.log('noo');
  //     });
  //   });
  // }

  // async totalKYCinaMonth() {
  //   const allKyc = await this.prisma.user.findMany({
  //     where: {
  //       createdAt: {
  //         gte: '2023-08-22T00:00:00.000Z',
  //         lte: '2023-09-30T23:59:00.000Z',
  //       },
  //       referralAgencyCode: {
  //         contains: 'RLI',
  //       },
  //     },
  //   });
  //   console.log('total KYC', allKyc.length);

  //   allKyc.map((kyc) => {
  //     console.log(kyc.pw_id, kyc.referralAgencyCode, kyc.createdAt);
  //   });
  // }

  // async findVivek() {
  //   const users = await this.prisma.user.findMany({
  //     where: {
  //       AND: [
  //         // {
  //         //   documents: {
  //         //     some: {
  //         //       createdAt: {
  //         //         gte: '2023-08-22T00:00:00.000Z',
  //         //         lte: '2023-09-30T23:59:00.000Z',
  //         //       },
  //         //       title: 'demat_document',
  //         //       status: 'APPROVED',
  //         //     },
  //         //   },
  //         // },
  //         // {
  //         //   filters: {
  //         //     some: {
  //         //       AND: [
  //         //         {
  //         //           name: "RAM",
  //         //           value: "32GB",
  //         //         },
  //         //         {
  //         //            name: "Storage",
  //         //            value: "1TB",
  //         //          },
  //         //       ],
  //         //     },
  //         //   },
  //         // },
  //         // {
  //         //   documents: {
  //         //     some: {
  //         //       title: {
  //         //         contains: 'agra_project',
  //         //       },
  //         //       status: 'APPROVED',
  //         //     },
  //         //   },
  //         // },
  //       ],
  //     },
  //     include: {
  //       documents: true,
  //     },
  //   });

  //   users.map((user) => {
  //     user.documents.map((document) => {
  //       if (document.title.includes('agra')) {
  //         console.log(
  //           user.pw_id,
  //           user.membership,
  //           user.name.split(' ')[0],
  //           user.referralAgencyCode,
  //           document.createdAt,
  //           document.title,
  //           document.amount
  //         );
  //       }
  //     });
  //   });

  //   // const users = await this.prisma.user.findMany({
  //   //   where: {
  //   //     AND: [
  //   //       {
  //   //         documents: {
  //   //           some: {
  //   //             createdAt: {
  //   //               gte: '2023-08-22T00:00:00.000Z',
  //   //               lte: '2023-09-30T23:59:00.000Z',
  //   //             },

  //   //             title: 'demat_document',
  //   //             status: 'APPROVED',
  //   //           },
  //   //         },
  //   //       },
  //   //     ],
  //   //   },
  //   //   include: {
  //   //     documents: true,
  //   //   },
  //   // });

  //   // console.log('--->>', users.length);

  //   // users.map((user) => {
  //   //   console.log(
  //   //     user.pw_id,
  //   //     user.membership,
  //   //     user.name.split(' ')[0],
  //   //     user.referralAgencyCode,
  //   //     user.createdAt
  //   //   );
  //   // });

  //   // console.log(users);

  //   // documents.map((document) => {
  //   //   console.log('---->>>', document.user.pw_id);
  //   // });

  //   // documents.map((userData) => {
  //   //   console.log(
  //   //     userData.user.pw_id,
  //   //     userData.user.membership,
  //   //     userData.user.name.split(' ')[0],
  //   //     userData.user.referralAgencyCode,
  //   //     userData.user.demat_account,
  //   //     userData.createdAt
  //   //   );
  //   // });

  //   // const data = await this.prisma.user.findMany({
  //   //   where: {
  //   //     AND: [
  //   //       {
  //   //         documents: {
  //   //           some: {
  //   //             createdAt: {
  //   //               gte: '2023-08-20T00:00:00.000Z',
  //   //               lte: '2023-09-30T23:59:00.000Z',
  //   //             },
  //   //             title: 'demat_document',
  //   //             status: 'APPROVED',
  //   //           },
  //   //         },
  //   //       },
  //   //     ],
  //   //   },
  //   //   orderBy: {
  //   //     referralAgencyCode: 'desc',
  //   //   },
  //   //   include: {
  //   //     documents: true,
  //   //   },
  //   // });
  //   // console.log('Vivek Ka Data ka number btaa', data.length);
  //   // data.map((user) => {
  //   //   console.log(
  //   //     user.pw_id,
  //   //     user.membership,
  //   //     user.name.split(' ')[0],
  //   //     user.referralAgencyCode,
  //   //     user.demat_account,
  //   //     user.createdAt
  //   //   );
  //   // });
  // }

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
    // console.log('listofagencyuser', listofagencyuser);
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
    const totallists = await this.prisma.user.findMany({
      where: {
        createdAt: {
          gte: '2023-09-23T00:00:00.000Z',
          lte: '2023-09-29T23:59:00.000Z',
        },
      },
    });

    totallists.map((total) => {
      console.log(total.pw_id, total.membership, total.referralAgencyCode);
    });
    return totallists;
  }

  // async findReport11() {
  //   const projectPaymentDocuments = await this.prisma.document.findMany({
  //     where: {
  //       AND: [
  //         {
  //           createdAt: {
  //             gte: '2023-09-23T00:00:00.000Z',
  //             lte: '2023-09-29T23:59:00.000Z',
  //           },
  //           url: {
  //             contains: 'kycramaerabackend.ramaera.com',
  //           },
  //           title: {
  //             contains: 'agra',
  //           },
  //           status: {
  //             not: 'REJECTED',
  //           },
  //         },
  //       ],
  //     },
  //     orderBy: {
  //       user: {
  //         referralAgencyCode: 'desc',
  //       },
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });
  //   projectPaymentDocuments.map((projectPaymentDocument) => {
  //     console.log(
  //       projectPaymentDocument.user.pw_id,
  //       projectPaymentDocument.title,
  //       projectPaymentDocument.amount,
  //       projectPaymentDocument.user.referralAgencyCode
  //     );
  //   });
  //   return projectPaymentDocuments;
  // }

  // async findReport1() {
  //   let total = 0;

  //   const doc = await this.prisma.document.findMany({
  //     where: {
  //       AND: [
  //         {
  //           title: { contains: 'agra' },
  //           status: { not: 'REJECTED' },
  //           user: {
  //             referralAgencyCode: {
  //               contains: 'RLI',
  //             },
  //           },
  //         },
  //       ],
  //       OR: [
  //         {
  //           createdAt: {
  //             gte: '2023-08-26T00:00:00.000Z',
  //             lte: '2023-09-01T23:59:00.000Z',
  //           },
  //         },
  //         {
  //           updatedAt: {
  //             gte: '2023-08-26T00:00:00.000Z',
  //             lte: '2023-09-01T23:59:00.000Z',
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });

  //   console.log('--->>>', doc.length);
  //   let total_amount = 0;
  //   doc.map(async (dd) => {
  //     const user = await this.prisma.user.findFirst({
  //       where: {
  //         id: dd.userId,
  //       },
  //     });

  //     const am = await this.prisma.document.findMany({
  //       where: {
  //         id: dd.id,
  //       },
  //     });
  //     console.log('--->>', am.length, user.referralAgencyCode);
  //     am.map((amount_total) => {
  //       console.log(
  //         '----->>Hajipur Details',
  //         amount_total.amount,
  //         amount_total.title,
  //         user.referralAgencyCode,
  //         user.pw_id
  //       );
  //     });
  //   });

  //   // checkreport.map(async (agency) => {
  //   //   console.log(agency.agencyCode);

  //   let totalUser;
  //   // const checkusersList = await this.prisma.user.findMany({
  //   //   where: {
  //   //     referralAgencyCode: agency.agencyCode,
  //   //   },
  //   // });

  //   // checkusersList.map(async (users) => {
  //   //   const docwithpay = await this.prisma.document.findMany({
  //   //     where: {
  //   //       AND: [
  //   //         {
  //   //           title: { contains: 'hajipur' },
  //   //           createdAt: {
  //   //             gte: '2023-08-26T00:00:00.000Z',
  //   //             lte: '2023-09-01T23:59:00.000Z',
  //   //           },
  //   //         },
  //   //       ],
  //   //     },
  //   //   });
  //   //   total += 1;
  //   // });

  //   // const checkuserinsideAGENCY = await this.prisma.user.findMany({
  //   //   where: {
  //   //     AND: [
  //   //       {
  //   //         referralAgencyCode: agency.agencyCode,
  //   //         createdAt: {
  //   //           gte: '2023-08-26T00:00:00.000Z',
  //   //           lte: '2023-09-01T23:59:00.000Z',
  //   //         },
  //   //       },
  //   //     ],
  //   //   },
  //   //   include: {
  //   //     documents: true,
  //   //   },
  //   //   // });
  //   // });
  //   // console.log('total hajipur doc', total);

  //   // console.log('---->>>', checkreport);
  // }

  update(id: number, updateKycAgencyInput: UpdateKycAgencyInput) {
    return `This action updates a #${id} kycAgency`;
  }

  remove(id: number) {
    return `This action removes a #${id} kycAgency`;
  }

  // async AgencyKYCPaymentInAMonth(month, AgencyCode) {
  //   const getDate = getMonthDates(month);
  //   // let AgencyCode = 'RLI715838';

  //   const KYCPaymentUsersInAgency = await this.prisma.user.findMany({
  //     where: {
  //       referralAgencyCode: AgencyCode,
  //       OR: [
  //         {
  //           membership: 'ADVANCE',
  //           kyc: 'APPROVED',
  //           DSCDetails: {
  //             some: {
  //               DSCStatus: 'RECEIVED',
  //             },
  //           },
  //         },
  //         {
  //           membership: 'BASIC',
  //           kyc: 'APPROVED',
  //           documents: {
  //             some: {
  //               title: {
  //                 contains: 'demat_document',
  //               },
  //               approvalDate: {
  //                 gte: getDate.startDate.toLocaleString(),
  //                 lte: getDate.endDate.toLocaleString(),
  //               },
  //               status: 'APPROVED',
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       DSCDetails: true,
  //     },
  //   });

  //   if (!KYCPaymentUsersInAgency) {
  //     throw new BadRequestException('Agency Code is Not Valid');
  //   }

  //   const HajipurAdvanceUserPayment = await this.prisma.user.findMany({
  //     where: {
  //       kyc: 'APPROVED',
  //       membership: 'ADVANCE',
  //       DSCDetails: {
  //         some: {
  //           DSCStatus: 'RECEIVED',
  //         },
  //       },
  //       documents: {
  //         some: {
  //           title: {
  //             contains: 'hajipur',
  //           },
  //           approvalDate: {
  //             gte: getDate.startDate.toLocaleString(),
  //             lte: getDate.endDate.toLocaleString(),
  //           },
  //         },
  //       },
  //     },
  //     include: {
  //       documents: true,
  //     },
  //   });

  //   let totalHajipurPayment=0

  //   HajipurAdvanceUserPayment.map((HajipurAdvanceUser) => {
  //     HajipurAdvanceUser.documents.map((documents)=>{
  //       if (documents.title.includes("hajipur")){
  //         totalHajipurPayment+=documents.amount
  //       }

  //     })
  //   });

  //   let totalKycPayment = KYCPaymentUsersInAgency.length * 200;
  //   totalHajipurPayment;
  // }
}
