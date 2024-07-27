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
import { CreateSalesPerson } from './dto/create-salesPerson.input';
import { title } from 'process';
import { UpdateBankDetailsInput } from 'src/users/dto/update-bankDetails.input';
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

const DateInGmt530 = () => {
  // Create a new Date object for the current date and time
  const currentDate = new Date();

  // Get the current time in milliseconds since January 1, 1970
  const currentTimeInMilliseconds = currentDate.getTime();

  // Calculate the offset in milliseconds for GMT+5:30 (5 hours and 30 minutes)
  const offsetInMilliseconds = 5.5 * 60 * 60 * 1000;

  // Apply the offset to the current time
  const newDateWithOffset = new Date(
    currentTimeInMilliseconds + offsetInMilliseconds
  );

  return newDateWithOffset;
};

@Injectable()
export class KycAgencyService {
  constructor(private prisma: PrismaService) {}

  // ******************* FindAgency **********************

  async findAgency(agencyCode) {
    try {
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
      let totalKycUser = 0;
      let totalKYC500User = 0;
      let totalSpecialKycApprovedUser=0
      let totalSpecialCommonKycApprovedUser=0
      let kycAmount = 0;
      let kyc500Amount = 0;

      let selfProjectAmount = 0;
      let hajipurProjectAmount = 0;
      let hyderabadProjectAmount = 0;
      let chapraProjectAmount = 0;

      let jhansiProjectAmount = 0;

      let agraProjectAmount = 0;

      



      const KycApprovedUser = await this.prisma.user.findMany({
        where: {
          referralAgencyCode: AgencyCode,
          kyc: 'APPROVED',
          isCommonMembership500: false,
          createdAt: {
            gte: agencyCreationDate.createdAt,
            lte:"2024-07-08T00:00:00.000Z"
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

      const KycCommon500ApprovedUser = await this.prisma.user.findMany({
        where: {
          referralAgencyCode: AgencyCode,
          kyc: 'APPROVED',
          isCommonMembership500: true,
          createdAt: {
            gte: agencyCreationDate.createdAt,
            lte:"2024-07-08T00:00:00.000Z"
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




      const SpecialKycApprovedUser = await this.prisma.user.findMany({
        where: {
          referralAgencyCode: AgencyCode,
          kyc: 'APPROVED',
          isCommonMembership500: false,
          kycApprovalDate:{
            gte:"2024-07-08T00:00:00.000Z",
            lte: getLocalDateData.endDate,
          },
          createdAt: {
            gte: "2024-07-08T00:00:00.000Z",
          },
          documents: {
            some: {
              status: 'APPROVED',
              title: 'demat_document',
              approvalDocumentDate: {
                gte: "2024-07-08T00:00:00.000Z",
                lte: getLocalDateData.endDate,
              },
            },
          },
        },
      });
  
      const SpecialKycCommon500ApprovedUser = await this.prisma.user.findMany({
        where: {
          referralAgencyCode: AgencyCode,
          kyc: 'APPROVED',
          isCommonMembership500: true,
          kycApprovalDate:{
            gte:"2024-07-08T00:00:00.000Z",
            lte: getLocalDateData.endDate,
          },
          createdAt: {
            gte: "2024-07-08T00:00:00.000Z",
          },
        },
      });


      totalSpecialKycApprovedUser=SpecialKycApprovedUser.length
      totalSpecialCommonKycApprovedUser=SpecialKycCommon500ApprovedUser.length

      totalKYC500User = KycCommon500ApprovedUser.length;

      totalKycUser = KycApprovedUser.length;

      const kycRewardAmount =200 
        // getStartAndEndDate(month, year).startDate >= '2024-02-01T00:00:00.000Z'
        //   ? await this.getKycReferralAmount(totalKycUser)
        //   : 200;

      const kyc500RewardAmount = await this.getKyc500ReferralAmount(
        totalKYC500User
      );

      const HajipurprojectDocument = await this.getProjectReferralAmount(
        month,
        year,
        'hajipur',
        AgencyCode
      );
      const AgraprojectDocument = await this.getProjectReferralAmount(
        month,
        year,
        'agra',
        AgencyCode
      );
      const HyderabadprojectDocument = await this.getPromoterReferralAmount(
        month,
        year,
        'hyderabad',
        AgencyCode
      );

      const JhansiprojectDocument = await this.getPromoterReferralAmount(
        month,
        year,
        'jhansi',
        AgencyCode
      );

      const ChapraprojectDocument = await this.getPromoterReferralAmount(
        month,
        year,
        'chapra',
        AgencyCode
      );

      const {
        projectAmount: selfAgencyHajipurAmount,
        paymentDocument: selfHajipurInvestmentDocument,
      } = await this.getSelfAgencyPaymentDetails(
        month,
        year,
        AgencyCode,
        'hajipur'
      );
      const {
        projectAmount: selfAgencyAgraAmount,
        paymentDocument: selfAgraInvestmentDocument,
      } = await this.getSelfAgencyPaymentDetails(
        month,
        year,
        AgencyCode,
        'agra'
      );

      const {
        projectAmount: selfAgencyHyderabadAmount,
        paymentDocument: selfHyderabadInvestmentDocument,
      } = await this.getSelfAgencyPaymentDetails(
        month,
        year,
        AgencyCode,
        'hyderabad'
      );
      const {
        projectAmount: selfAgencyChapraAmount,
        paymentDocument: selfChapraInvestmentDocument,
      } = await this.getSelfAgencyPaymentDetails(
        month,
        year,
        AgencyCode,
        'chapra'
      );
      const {
        projectAmount: selfAgencyJhansiAmount,
        paymentDocument: selfJhansiInvestmentDocument,
      } = await this.getSelfAgencyPaymentDetails(
        month,
        year,
        AgencyCode,
        'jhansi'
      );
      const selfAgencyAgraPaymentAmount = selfAgencyAgraAmount * 0.01;
      const selfAgencyHajipurPaymentAmount = selfAgencyHajipurAmount * 0.1;
      const selfAgencyHyderabadPaymentAmount = selfAgencyHyderabadAmount * 0.1;
      const selfAgencyChapraPaymentAmount = selfAgencyChapraAmount * 0.05;
      const selfAgencyJhansiPaymentAmount = selfAgencyJhansiAmount * 0.05;

      let HajipurAmount = 0;
      HajipurprojectDocument.map((data) => {
        HajipurAmount += data?.amount;
      });

      let AgraAmount = 0;
      AgraprojectDocument.map((data) => {
        AgraAmount += data?.amount;
      });

      let HyderabadAmount = 0;
      HyderabadprojectDocument.map((data) => {
        HyderabadAmount += data?.amount;
      });
      let JhansiAmount = 0;
      JhansiprojectDocument.map((data) => {
        JhansiAmount += data?.amount;
      });

      let ChapraAmount = 0;
      ChapraprojectDocument.map((data) => {
        ChapraAmount += data?.amount;
      });

      hajipurProjectAmount = HajipurAmount * 0.01;
      agraProjectAmount = AgraAmount * 0.1;
      hyderabadProjectAmount = HyderabadAmount * 0.1;
      chapraProjectAmount = ChapraAmount * 0.05;
      jhansiProjectAmount = JhansiAmount * 0.05;

      kycAmount = totalKycUser * kycRewardAmount;
      kyc500Amount = totalKYC500User * kyc500RewardAmount;
      return {
        kycRewardAmount,
        kycAmount,
        SpecialKycApprovedUser,
        SpecialKycCommon500ApprovedUser,
        KycApprovedUser,
        kyc500RewardAmount,
        kyc500Amount,
        KycCommon500ApprovedUser,
        hajipurProjectAmount,
        agraProjectAmount,
        hyderabadProjectAmount,
        jhansiProjectAmount,
        chapraProjectAmount,
        selfAgencyHajipurPaymentAmount,
        selfAgencyAgraPaymentAmount,
        selfAgencyHyderabadPaymentAmount,
        selfHajipurInvestmentDocument,
        selfAgraInvestmentDocument,
        selfHyderabadInvestmentDocument,
        selfJhansiInvestmentDocument,
        selfChapraInvestmentDocument,
        selfAgencyJhansiPaymentAmount,
        selfAgencyChapraPaymentAmount,
        selfAgencyAgraAmount,
        HajipurprojectDocument,
        AgraprojectDocument,
        HyderabadprojectDocument,
        JhansiprojectDocument,
        ChapraprojectDocument,
      };
    }
    // let basicKYCAmount = 0;
    // let advanceKYCAmount = 0;
    let kycAmount = 0;
    let hajipurProjectAmount = 0;
    let agraProjectAmount = 0;

    const KycApprovedUser = await this.prisma.user.findMany({
      where: {
        referralAgencyCode: AgencyCode,
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
    const HajipurprojectDocument = await this.prisma.document.findMany({
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

    const AgraprojectDocument = await this.prisma.document.findMany({
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

    let HajipurAmount = 0;
    HajipurprojectDocument.map((data) => {
      HajipurAmount += data?.amount;
    });

    let AgraAmount = 0;
    AgraprojectDocument.map((data) => {
      AgraAmount += data?.amount;
    });

    hajipurProjectAmount = HajipurAmount * 0.01;
    agraProjectAmount = AgraAmount * 0.1;
    kycAmount = KycApprovedUser.length * 200;

    return {
      hajipurProjectAmount,
      agraProjectAmount,
      kycAmount,
      KycApprovedUser,

      AgraprojectDocument,

      HajipurprojectDocument,
    };
  }

  async getKycReferralAmount(kycUsers) {
    const ranges = [
      { min: 0, max: 7, amount: 200 },
      { min: 8, max: 11, amount: 300 },
      { min: 12, max: 14, amount: 400 },
      { min: 15, max: 20, amount: 600 },
      { min: 21, max: 25, amount: 800 },
      { min: 26, max: 500, amount: 1000 },
    ];

    for (const range of ranges) {
      if (kycUsers >= range.min && kycUsers <= range.max) {
        return range.amount;
      }
    }
  }

  async getKyc500ReferralAmount(kycUsers) {
    const ranges = [
      { min: 0, max: 5, amount: 100 },
      { min: 6, max: 10, amount: 130 },
      { min: 11, max: 15, amount: 150 },
      { min: 15, max: 20, amount: 170 },
      { min: 21, max: 500, amount: 200 },
    ];

    for (const range of ranges) {
      if (kycUsers >= range.min && kycUsers <= range.max) {
        return range.amount;
      }
    }
  }



  async getAmountAfter8July(month,year,agencyCode){
    const getLocalDateData = getStartAndEndDate(month, year);

    const agencyCreationDate = await this.prisma.kycAgency.findFirst({
      where: {
        agencyCode: agencyCode,
      },
      include: {
        user: true,
      },
    });
    const KycApprovedUser = await this.prisma.user.findMany({
      where: {
        referralAgencyCode: agencyCode,
        kyc: 'APPROVED',
        isCommonMembership500: false,
        kycApprovalDate:{
          gte:"2024-07-08T00:00:00.000Z",
          lte: getLocalDateData.endDate,
        },
        createdAt: {
          gte: agencyCreationDate.createdAt,
        },
        documents: {
          some: {
            status: 'APPROVED',
            title: 'demat_document',
            approvalDocumentDate: {
              gte: "2024-07-08T00:00:00.000Z",
              lte: getLocalDateData.endDate,
            },
          },
        },
      },
    });

    const KycCommon500ApprovedUser = await this.prisma.user.findMany({
      where: {
        referralAgencyCode: agencyCode,
        kyc: 'APPROVED',
        isCommonMembership500: true,
        kycApprovalDate:{
          gte:"2024-07-08T00:00:00.000Z",
          lte: getLocalDateData.endDate,
        },
        createdAt: {
          gte: agencyCreationDate.createdAt,
        },
      },
    });


   const kycAmount=KycApprovedUser.length*1000
 const    kyc500Amount=KycCommon500ApprovedUser.length*250



    return {KycApprovedUser,KycCommon500ApprovedUser,kycAmount,kyc500Amount}
    
  }

  async getProjectReferralAmount(month, year, projectTitle, agencyCode) {
    const getLocalDateData = getStartAndEndDate(month, year);
    const projectDocumentData = await this.prisma.document.findMany({
      where: {
        approvalDocumentDate: {
          gte: getLocalDateData.startDate,
          lte: getLocalDateData.endDate,
        },
        title: {
          contains: projectTitle,
        },
        status: 'APPROVED',
        user: {
          referralAgencyCode: agencyCode.toLocaleUpperCase(),
          isKycAgent: false,
        },
      },
      include: {
        user: true,
      },
    });
    return projectDocumentData;
  }

  async getagencyReferredAmount(month, year, agencyCode) {
    const getLocalDateData = getStartAndEndDate(month, year);
    const newAgencies = await this.prisma.user.findMany({
      where: {
        referralAgencyCode: agencyCode,
        isKycAgent: true,
        KycAgency: {
          createdAt: {
            gte: '2024-02-01T00:00:00.000Z',
          },
        },
      },
    });
  }

  async getPromoterReferralAmount(month, year, projectTitle, agencyCode) {
    const getLocalDateData = getStartAndEndDate(month, year);

    const projectDocumentWithoutPromoterData =
      await this.prisma.document.findMany({
        where: {
          approvalDocumentDate: {
            gte: getLocalDateData.startDate,
            lte: getLocalDateData.endDate,
          },
          referralAgencyCode: null,
          title: {
            contains: projectTitle,
          },
          status: 'APPROVED',
          user: {
            referralAgencyCode: agencyCode.toLocaleUpperCase(),
            isKycAgent: false,
          },
        },
        include: {
          user: true,
        },
      });
    const projectDocumentWithPromoter = await this.prisma.document.findMany({
      where: {
        approvalDocumentDate: {
          gte: getLocalDateData.startDate,
          lte: getLocalDateData.endDate,
        },
        referralAgencyCode: agencyCode.toLocaleUpperCase(),
        title: {
          contains: projectTitle,
        },
        status: 'APPROVED',
        user: {
          isKycAgent: false,
        },
      },
      include: {
        user: true,
      },
    });
    console.log(
      'projectDocumentWithoutPromoterData',
      projectDocumentWithoutPromoterData
    );

    const projectDocumentData = [
      ...projectDocumentWithoutPromoterData,
      ...projectDocumentWithPromoter,
    ];

    return projectDocumentData;
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
      include: {
        user: true,
      },
    });

    let projectAmount = 0;
    paymentDocument.map((doc) => (projectAmount += doc.amount));

    projectAmount;

    return { projectAmount, paymentDocument };
  }

  async findAllKycAgnecyuser(code: GetAllUserofSpecificKycAgency) {
    const listofagencyuser = await this.prisma.user.findMany({
      where: {
        referralAgencyCode: code.agencyCode,
      },
      include: {
        nominee: true,
        documents: true,
        BankDetails:true,
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





  async bankDetailsMissingHajipur(){
    const details = await this.prisma.user.findMany({
      where:{
        documents:{
          some:{
            title:"hajipur_project_payment"
          }
        },
        BankDetails:{
          none:{}
        }
      },
      include:{
        documents:true,
        BankDetails:true
      },
      orderBy:{
        createdAt:"asc"
      }

    })
    return details
  }


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
      throw new NotFoundException(`No user found for : ${referralCode}`);
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

    return agenciesData;
  }



  async bankDetailsofUserNotinAgency(){
    const list = await this.prisma.user.findMany({
      where:{
   
          referralAgencyCode:{
            not:{
              contains:"RLI"
            }
          },
          BankDetails:undefined
      },
      include:{
        BankDetails:true
      }
    })

    return list
  }



async updateBankDetailsOfUserByAgency(userId:string,updaterid:string,data:UpdateBankDetailsInput){
  const updateData=await this.prisma.bankDetails.update({
    where:{
      userId
    },
    data:{
      bankName:data.bankName,
      ifscCode:data.ifscCode,
      accountNumber:data.ifscCode,
      metaData:{"userId":updaterid}


    }
  })

  return updateData
}


}
