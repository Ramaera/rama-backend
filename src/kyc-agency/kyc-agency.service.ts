import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKycAgencyCodeInput } from './dto/create-kyc-agency.input';
import { UpdateKycAgencyInput } from './dto/update-kyc-agency.input';
import { PrismaService } from 'nestjs-prisma';
import {
  GetAllUserofSpecificKycAgency,
  GetKycAgency,
} from './dto/get-kyc-agency.input';
var AgencyList = [];
const getStartAndEndDate = (month, year) => {
  if (isNaN(month) || month < 1 || month > 12) {
    throw new Error('Invalid month');
  }

  // Create a Date object with the specified year and month
  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)); // Month is 0-based
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59)); // Set to the last day, last hour, last minute, last second

  // Add the desired timezone offset (GMT+5:30)
  // const timeZoneOffset = 330; // 5 hours and 30 minutes in minutes
  startDate.setMinutes(startDate.getMinutes());
  endDate.setMinutes(endDate.getMinutes());

  // Format the dates as ISO strings
  const formattedStartDate = startDate.toISOString();
  const formattedEndDate = endDate.toISOString();

  return {
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  };
};

// const { startDate, endDate } = getStartAndEndDate(11, 2023);
// console.log('Start Date:', startDate);
// console.log('End Date:', endDate);

@Injectable()
export class KycAgencyService {
  constructor(private prisma: PrismaService) {}

  // ******************* FindAgency **********************

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

  // ***************** Create Agency Code ******************

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

  // **************** Find All Agency Code *********************
  async findAll() {
    const check = await this.prisma.kycAgency.findMany({
      include: {
        user: true,
      },
    });
    return check;
  }

  //  * ******************* Find Agency Payment **************************

  async findAgencyPayment(month: number, year: number, AgencyCode: string) {
    const getLocalDateData = getStartAndEndDate(month, year);

    const agencyCreationDate = await this.prisma.kycAgency.findFirst({
      where: {
        agencyCode: AgencyCode,
      },
      include: {
        user: true,
      },
    });

    // Condition for Novemeber because , Before Novemeber conditions for Self Project payment is Different
    if (
      getStartAndEndDate(month, year).startDate >= '2023-11-01T00:00:00.000Z'
    ) {
      let basicKYCAmount = 0;
      let advanceKYCAmount = 0;
      let kycAmount = 0;
      let selfProjectAmount = 0;
      let hajipurProjectAmount = 0;
      let agraProjectAmount = 0;

      const BasicKycApprovedUser = await this.prisma.user.findMany({
        where: {
          referralAgencyCode: AgencyCode,
          membership: 'BASIC',
          kyc: 'APPROVED',
          createdAt: {
            gte: agencyCreationDate.createdAt,
          },
          documents: {
            some: {
              status: 'APPROVED',
              title: 'demat_document',
              approvalDocumentDate: {
                gte: getLocalDateData.startDate,
                lte: getLocalDateData.endDate,
              },
            },
          },
        },
      });

      basicKYCAmount = BasicKycApprovedUser.length * 200;

      const AdvanceKYCApprovedUser = await this.prisma.user.findMany({
        where: {
          referralAgencyCode: AgencyCode,
          membership: 'ADVANCE',
          kyc: 'APPROVED',
          createdAt: {
            gte: agencyCreationDate.createdAt,
          },
          documents: {
            some: {
              status: 'APPROVED',
              title: 'demat_document',
              approvalDocumentDate: {
                gte: getLocalDateData.startDate,
                lte: getLocalDateData.endDate,
              },
            },
          },
          // DSCDetails: {
          //   some: {
          //     DSCStatus: 'RECEIVED',
          //   },
          // },
        },
      });

      advanceKYCAmount = AdvanceKYCApprovedUser.length * 200;

      const basicHajipurprojectDocument = await this.prisma.document.findMany({
        where: {
          approvalDocumentDate: {
            gte: getLocalDateData.startDate,
            lte: getLocalDateData.endDate,
          },
          title: {
            contains: 'hajipur',
          },
          status: 'APPROVED',
          user: {
            referralAgencyCode: AgencyCode,
            membership: 'BASIC',
            isKycAgent: false,
            documents: {
              some: {
                title: {
                  contains: 'demat_document',
                },
                status: 'APPROVED',
              },
            },
          },
        },
        include: {
          user: true,
        },
      });

      const advanceHajipurprojectDocument = await this.prisma.document.findMany(
        {
          where: {
            approvalDocumentDate: {
              gte: getLocalDateData.startDate,
              lte: getLocalDateData.endDate,
            },
            title: {
              contains: 'hajipur',
            },
            status: 'APPROVED',
            user: {
              referralAgencyCode: AgencyCode,
              membership: 'ADVANCE',
              isKycAgent: false,
              documents: {
                some: {
                  title: {
                    contains: 'demat_document',
                  },
                  status: 'APPROVED',
                },
              },
              // DSCDetails: {
              //   some: {
              //     DSCStatus: 'RECEIVED',
              //   },
              // },
            },
          },
          include: {
            user: true,
          },
        }
      );

      const basicAgraprojectDocument = await this.prisma.document.findMany({
        where: {
          approvalDocumentDate: {
            gte: getLocalDateData.startDate,
            lte: getLocalDateData.endDate,
          },
          title: {
            contains: 'agra',
          },
          status: 'APPROVED',
          user: {
            referralAgencyCode: AgencyCode,
            membership: 'BASIC',
            isKycAgent: false,
            documents: {
              some: {
                title: {
                  contains: 'demat_document',
                },
                status: 'APPROVED',
              },
            },
          },
        },
        include: {
          user: true,
        },
      });

      const advanceAgraprojectDocument = await this.prisma.document.findMany({
        where: {
          approvalDocumentDate: {
            gte: getLocalDateData.startDate,
            lte: getLocalDateData.endDate,
          },
          title: {
            contains: 'agra',
          },
          status: 'APPROVED',
          user: {
            referralAgencyCode: AgencyCode,
            membership: 'ADVANCE',
            isKycAgent: false,
            documents: {
              some: {
                title: {
                  contains: 'demat_document',
                },
                status: 'APPROVED',
              },
            },
          },
        },
        include: {
          user: true,
        },
      });

      const {
        finalProjectAmount: selfAgencyHajipurPaymentAmount,
        paymentDocument: selfHajipurInvestmentDocument,
      } = await this.getSelfAgencyPaymentDetails(
        month,
        year,
        AgencyCode,
        'hajipur'
      );
      const {
        finalProjectAmount: selfAgencyAgraPaymentAmount,
        paymentDocument: selfAgraInvestmentDocument,
      } = await this.getSelfAgencyPaymentDetails(
        month,
        year,
        AgencyCode,
        'agra'
      );

      let basicHajipurAmount = 0;
      basicHajipurprojectDocument.map((data) => {
        basicHajipurAmount += data?.amount;
      });

      let advanceHajipurAmount = 0;
      advanceHajipurprojectDocument.map((data) => {
        advanceHajipurAmount += data?.amount;
      });

      let basicAgraAmount = 0;
      basicAgraprojectDocument.map((data) => {
        basicAgraAmount += data?.amount;
      });

      let advanceAgraAmount = 0;
      advanceAgraprojectDocument.map((data) => {
        advanceAgraAmount += data?.amount;
      });

      hajipurProjectAmount =
        basicHajipurAmount * 0.01 + advanceHajipurAmount * 0.01;
      agraProjectAmount = basicAgraAmount * 0.1 + advanceAgraAmount * 0.1;
      kycAmount = basicKYCAmount + advanceKYCAmount;

      return {
        hajipurProjectAmount,
        agraProjectAmount,
        kycAmount,
        BasicKycApprovedUser,
        selfAgencyHajipurPaymentAmount,
        selfAgencyAgraPaymentAmount,
        selfHajipurInvestmentDocument,
        selfAgraInvestmentDocument,
        basicAgraprojectDocument,
        advanceAgraprojectDocument,
        basicHajipurprojectDocument,
        advanceHajipurprojectDocument,
      };
    }
    let basicKYCAmount = 0;
    let advanceKYCAmount = 0;
    let kycAmount = 0;
    let hajipurProjectAmount = 0;
    let agraProjectAmount = 0;

    const BasicKycApprovedUser = await this.prisma.user.findMany({
      where: {
        referralAgencyCode: AgencyCode,
        membership: 'BASIC',
        kyc: 'APPROVED',
        createdAt: {
          gte: agencyCreationDate.createdAt,
        },
        documents: {
          some: {
            status: 'APPROVED',
            title: 'demat_document',
            approvalDocumentDate: {
              gte: getLocalDateData.startDate,
              lte: getLocalDateData.endDate,
            },
          },
        },
      },
    });

    basicKYCAmount = BasicKycApprovedUser.length * 200;

    const AdvanceKYCApprovedUser = await this.prisma.user.findMany({
      where: {
        referralAgencyCode: AgencyCode,
        membership: 'ADVANCE',
        kyc: 'APPROVED',
        createdAt: {
          gte: agencyCreationDate.createdAt,
        },
        documents: {
          some: {
            status: 'APPROVED',
            title: 'demat_document',
            approvalDocumentDate: {
              gte: getLocalDateData.startDate,
              lte: getLocalDateData.endDate,
            },
          },
        },
        // DSCDetails: {
        //   some: {
        //     DSCStatus: 'RECEIVED',
        //   },
        // },
      },
    });

    advanceKYCAmount = AdvanceKYCApprovedUser.length * 200;

    const basicHajipurprojectDocument = await this.prisma.document.findMany({
      where: {
        approvalDocumentDate: {
          gte: getLocalDateData.startDate,
          lte: getLocalDateData.endDate,
        },
        title: {
          contains: 'hajipur',
        },
        status: 'APPROVED',
        user: {
          referralAgencyCode: AgencyCode,
          membership: 'BASIC',
          documents: {
            some: {
              title: {
                contains: 'demat_document',
              },
              status: 'APPROVED',
            },
          },
        },
      },
      include: {
        user: true,
      },
    });

    const advanceHajipurprojectDocument = await this.prisma.document.findMany({
      where: {
        approvalDocumentDate: {
          gte: getLocalDateData.startDate,
          lte: getLocalDateData.endDate,
        },
        title: {
          contains: 'hajipur',
        },
        status: 'APPROVED',
        user: {
          referralAgencyCode: AgencyCode,
          membership: 'ADVANCE',
          documents: {
            some: {
              title: {
                contains: 'demat_document',
              },
              status: 'APPROVED',
            },
          },
          // DSCDetails: {
          //   some: {
          //     DSCStatus: 'RECEIVED',
          //   },
          // },
        },
      },
      include: {
        user: true,
      },
    });

    const basicAgraprojectDocument = await this.prisma.document.findMany({
      where: {
        approvalDocumentDate: {
          gte: getLocalDateData.startDate,
          lte: getLocalDateData.endDate,
        },
        title: {
          contains: 'agra',
        },
        status: 'APPROVED',
        user: {
          referralAgencyCode: AgencyCode,
          membership: 'BASIC',
          documents: {
            some: {
              title: {
                contains: 'demat_document',
              },
              status: 'APPROVED',
            },
          },
        },
      },
      include: {
        user: true,
      },
    });

    const advanceAgraprojectDocument = await this.prisma.document.findMany({
      where: {
        approvalDocumentDate: {
          gte: getLocalDateData.startDate,
          lte: getLocalDateData.endDate,
        },
        title: {
          contains: 'agra',
        },
        status: 'APPROVED',
        user: {
          referralAgencyCode: AgencyCode,
          membership: 'ADVANCE',
          isKycAgent: false,
          documents: {
            some: {
              title: {
                contains: 'demat_document',
              },
              status: 'APPROVED',
            },
          },
        },
      },
      include: {
        user: true,
      },
    });

    let basicHajipurAmount = 0;
    basicHajipurprojectDocument.map((data) => {
      basicHajipurAmount += data?.amount;
    });

    let advanceHajipurAmount = 0;
    advanceHajipurprojectDocument.map((data) => {
      advanceHajipurAmount += data?.amount;
    });

    let basicAgraAmount = 0;
    basicAgraprojectDocument.map((data) => {
      basicAgraAmount += data?.amount;
    });

    let advanceAgraAmount = 0;
    advanceAgraprojectDocument.map((data) => {
      advanceAgraAmount += data?.amount;
    });

    hajipurProjectAmount =
      basicHajipurAmount * 0.01 + advanceHajipurAmount * 0.01;
    agraProjectAmount = basicAgraAmount * 0.1 + advanceAgraAmount * 0.1;
    kycAmount = basicKYCAmount + advanceKYCAmount;

    return {
      hajipurProjectAmount,
      agraProjectAmount,
      kycAmount,
      BasicKycApprovedUser,
      basicAgraprojectDocument,
      advanceAgraprojectDocument,
      basicHajipurprojectDocument,
      advanceHajipurprojectDocument,
    };
  }

  async getSelfAgencyPaymentDetails(
    month: number,
    year: number,
    AgencyCode: string,
    project: string
  ) {
    const getLocalDateData = getStartAndEndDate(month, year);
    const agencyData = await this.prisma.kycAgency.findFirst({
      where: {
        agencyCode: AgencyCode,
      },
      include: {
        user: true,
      },
    });

    const paymentDocument = await this.prisma.document.findMany({
      where: {
        AND: [
          {
            approvalDocumentDate: {
              gte: getLocalDateData.startDate,
              lte: getLocalDateData.endDate,
            },
          },
          {
            approvalDocumentDate: {
              gte: agencyData.createdAt,
            },
          },
        ],

        title: {
          contains: project,
        },
        status: 'APPROVED',
        user: {
          pw_id: agencyData.user.pw_id,
        },
      },
    });

    let projectAmount = 0;
    paymentDocument.map((doc) => (projectAmount += doc.amount));

    const finalProjectAmount = projectAmount * 0.01;

    return { finalProjectAmount, paymentDocument };
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

  async findReferralDetails(referralCode) {
    const UserDetails = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            pw_id: referralCode.toUpperCase(),
          },
          {
            KycAgency: {
              agencyCode: referralCode.toUpperCase(),
            },
          },
        ],
      },
    });

    if (!UserDetails) {
      throw new NotFoundException(`No user found for PW_Id: ${referralCode}`);
    }

    return UserDetails;
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

  async stow(saturdayDate: string, nextFridayDate: string) {
    const allAgencyDetails = await this.prisma.kycAgency.findMany({
      include: { user: true },
    });
    const agenciesData = [];

    await Promise.all(
      allAgencyDetails.map(async (agencyData, index) => {
        const user = await this.prisma.user.findMany({
          where: {
            kyc: 'APPROVED',
            referralAgencyCode: agencyData.agencyCode,
            documents: {
              some: {
                title: 'demat_document',
                status: 'APPROVED',
                approvalDocumentDate: {
                  gte: saturdayDate,
                  lte: nextFridayDate,
                },
              },
            },
          },
        });
        agenciesData.push({
          agencyCode: agencyData.agencyCode,
          agencyOwnerName: agencyData.user.name,
          users: user,
        });
      })
    );
    // Sort the array based on the number of users in descending order
    agenciesData.sort((a, b) => b.users.length - a.users.length);

    console.log('--', agenciesData);

    return agenciesData;
  }
}
