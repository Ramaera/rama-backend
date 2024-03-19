import { PrismaService } from 'nestjs-prisma';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import {
  UpdateUserInputData,
  UpdateUserRoleInput,
} from './dto/update-user.input';
import { NomineeInput } from './dto/createNominee.input';
import { saveAs } from 'file-saver';

// import { CACHE_MANAGER } from '@nestjs/common';
// import { Cache } from 'cache-manager';

import {
  UpdateLicenseDetailsInput,
  UpdateSubKycStatus,
  UpdateUserInputByAdmin,
  UpdateUserMembershipAdmin,
  UpdateUserStatusAdmin,
} from './dto/update-user-Admin.input ';
import { Membership, User } from '@prisma/client';
import { UpdateDocumentUTRandAmountInput } from './dto/update-documentUTRandAmount.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { UpdateBasicDetailsInput } from './dto/update-BasicDetails.input';
import { UpdateDematDocumentsInput } from './dto/update-dematDocument.input';
import { UpdateNomineeDetailsInput } from './dto/update-nominee.input';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  // ************************* Update User Details *****************

  async updateUser(userId: string, newUserData: UpdateUserInputData) {
    const updated_user = this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });

    return updated_user;
  }

  // ***************************** Update User Role *****************

  async updateUserRole(newUserData: UpdateUserRoleInput) {
    const updated_user = await this.prisma.user.update({
      data: {
        role: newUserData.role,
      },
      where: {
        id: newUserData.id,
      },
    });

    return updated_user;
  }

  // ********************************* Update User Data by Admin    ********************
  async updateDataByAdmin(newData: UpdateUserInputByAdmin) {
    try {
      const updated_details = this.prisma.user.update({
        where: {
          id: newData.id,
        },
        data: {
          name: newData.name,
          email: newData.email,
          father_or_husband_name: newData.father_or_husband_name,
          mobile_number: newData.mobile_number,
          alternate_mobile_number: newData.alternate_mobile_number,
          date_of_birth: newData.date_of_birth,
          demat_account: newData.demat_account,
          documents:
            newData.documentId && !newData.url
              ? {
                  update: {
                    data: {
                      utrNo: newData.utrNo,
                      amount: newData.amount,
                    },
                    where: {
                      id: newData.documentId,
                    },
                  },
                }
              : newData.url
              ? {
                  update: {
                    data: {
                      url: newData.url,
                    },
                    where: { id: newData.documentId },
                  },
                }
              : undefined,
          nominee:
            newData.nomineeName || newData.nomineeRelationship
              ? {
                  upsert: {
                    create: {
                      name: newData.nomineeName,
                      relationship: newData.nomineeRelationship,
                    },
                    update: {
                      name: newData.nomineeName,
                      relationship: newData.nomineeRelationship,
                    },
                  },
                }
              : undefined,
        },
        include: {
          nominee: true,
          documents: true,
        },
      });
      return updated_details;
    } catch (err) {
      throw new Error('Facing Some Issue. Please Try After some Time');
    }
  }

  async updateBasicDetailsByAdmin(newData: UpdateBasicDetailsInput) {
    return await this.prisma.user.update({
      where: {
        id: newData.id,
      },
      data: {
        name: newData.name,
        email: newData.email,
        father_or_husband_name: newData.father_or_husband_name,
        mobile_number: newData.mobile_number,
        alternate_mobile_number: newData.alternate_mobile_number,
        date_of_birth: newData.date_of_birth,
      },
    });
  }

  async updateDematDetailsByAdmin(newData: UpdateDematDocumentsInput) {
    return await this.prisma.user.update({
      where: {
        id: newData.userId,
      },
      data: {
        demat_account: newData.demat_account,
      },
    });
  }

  async updateNomineeDetailsByAdmin(newData: UpdateNomineeDetailsInput) {
    return await this.prisma.nominee.update({
      where: {
        userId: newData.userId,
      },
      data: {
        name: newData.name,
        relationship: newData.relationship,
      },
    });
  }

  async updateDocumentUrlByAdmin(newData: UpdateDocumentInput) {
    const data = await this.prisma.document.update({
      where: {
        id: newData.documentId,
      },
      data: {
        url: newData.url,
        status: 'PENDING',
      },
    });
    return data;
  }

  async updateDocumentmaountandUtr(data: UpdateDocumentUTRandAmountInput) {
    return await this.prisma.document.update({
      data: {
        utrNo: data.utrNo,
        amount: data.amount,
      },
      where: {
        id: data.documentId,
      },
    });
  }

  // **************************** Update User Kyc Status *************************
  async updateStatus(adminId: string, newUserData: UpdateUserStatusAdmin) {
    let user = await this.prisma.user.findFirst({
      where: {
        id: newUserData.id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }
    user.kyc = newUserData.kyc;

    if (user.kyc === 'APPROVED') {
      user.kycApprovalDate = new Date();
    }

    const userPayload = {
      ...user,
    };

    user = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...userPayload,
      },
    });

    const identifier = `${user.id}-${adminId}`;

    const kycHandlerData = {
      identifier,
      userId: user.id,
      updatedKycStatus: newUserData.kyc,
      handlerId: adminId,
    };

    await this.prisma.kycHandler.create({
      data: kycHandlerData,
    });

    return user;
  }

  // *************************** Update MemberShip of User ***********************

  async updateMembership(
    adminId: string,
    newUserData: UpdateUserMembershipAdmin
  ) {
    let user = await this.prisma.user.findFirst({
      where: {
        id: newUserData.id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }
    user.membership = newUserData.membsership;
    const userPayload = {
      ...user,
    };

    user = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...userPayload,
      },
    });

    const identifier = `${user.id}-${adminId}`;

    const kycHandlerData = {
      identifier,
      userId: user.id,
      updatedKycStatus: newUserData.membsership,
      handlerId: adminId,
    };

    await this.prisma.kycHandler.create({
      data: kycHandlerData,
    });

    return user;
  }

  // ***************************** Get User Details By Id    ************************
  async getUser(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        nominee: true,
        documents: true,
        KycAgency: true,
        DSCDetails: true,
        ProjectEnrolledStatus: true,
        shareHoldingType: true,
      },
    });

    return user;
  }

  // ************************ Get All Kyc Handles *****************************
  async getKycHandler() {
    return await this.prisma.kycHandler.findMany({});
  }

  // ########## Get All User #####################

  async getAllUser({ skip, take }) {
    // const cacheKey = `getAllUser:${skip}:${take}`;
    // const cachedUserData: any = await this.cacheManager.get(cacheKey);
    // if (cachedUserData) {
    //   console.log('returning data from cache');
    //   return JSON.parse(cachedUserData);
    // }
    const allUser = await this.prisma.user.findMany({
      take,
      skip,
      include: {
        documents: true,
        nominee: true,
        KycAgency: true,
        DSCDetails: true,
        ProjectEnrolledStatus: true,
      },
    });

    // await this.cacheManager.set(cacheKey, 'unknown', 3600);
    return allUser;
  }

  // ************************* User Counts  ***********************

  async getAllUsersCount() {
    const totalSubscribers = await this.prisma.user.count({});

    const totalBasicSubscribers = await this.prisma.user.count({
      where: {
        membership: 'BASIC',
      },
    });
    const totalAdvanceSubscribers = await this.prisma.user.count({
      where: {
        membership: 'ADVANCE',
      },
    });

    const totalHajipurSubscribers = this.totalProjectSubscribers('hajipur');
    const totalAgraMartSubscribers = this.totalProjectSubscribers('agra');
    const totalHyderbadMartSubscribers =
      this.totalProjectSubscribers('hyderabad');

    return {
      totalSubscribers,
      totalBasicSubscribers,
      totalAdvanceSubscribers,
      totalHajipurSubscribers,
      totalAgraMartSubscribers,
      totalHyderbadMartSubscribers,
    };
  }

  async totalProjectSubscribers(projectLocation: string) {
    const SubscribersCount = await this.prisma.user.count({
      where: {
        documents: {
          some: {
            title: {
              contains: projectLocation,
            },
            status: 'APPROVED',
          },
        },
      },
    });
    return SubscribersCount;
  }

  // ************************* shareHolders Counts  ***********************

  async getAllShareHoldersCount() {
    const TotalShareholders = await this.prisma.shareHoldingType.count({});

    const TotalBasicShareHolder = await this.prisma.shareHoldingType.count({
      where: {
        user: {
          membership: 'BASIC',
        },
      },
    });
    const TotalAdvanceShareHolder = await this.prisma.shareHoldingType.count({
      where: {
        user: {
          membership: 'ADVANCE',
        },
      },
    });

    const TotalHajipurShareHolder = await this.prisma.shareHoldingType.count({
      where: {
        InvestmentType: {
          contains: 'hajipur',
          mode: 'insensitive',
        },
      },
    });

    return {
      TotalShareholders,
      TotalBasicShareHolder,
      TotalAdvanceShareHolder,
      TotalHajipurShareHolder,
    };
  }

  // *********************** Amount Received *************************

  async projectAmountReceived() {
    const hajipurDocuments = await this.prisma.document.findMany({
      where: {
        title: {
          contains: 'hajipur', // Case-insensitive search for "hajipur" in title
        },
        status: 'APPROVED',
        NOT: {
          userId: 'clmospewa0747luj406xtnoh7',
        },
      },
      select: {
        amount: true, // Select the "amount" field
      },
    });

    const agraDocuments = await this.prisma.document.findMany({
      where: {
        title: {
          contains: 'agra', // Case-insensitive search for "hajipur" in title
        },
        status: 'APPROVED',
      },
      select: {
        amount: true, // Select the "amount" field
      },
    });
    const hyderabadDocuments = await this.prisma.document.findMany({
      where: {
        title: {
          contains: 'hyderabad', // Case-insensitive search for "hajipur" in title
        },
        status: 'APPROVED',
      },
      select: {
        amount: true, // Select the "amount" field
      },
    });

    // Calculate the sum of "amount" for the filtered documents
    const totalHajipurAmount = hajipurDocuments.reduce(
      (sum, document) => sum + document.amount,
      0
    );
    const totalAgraAmount = agraDocuments.reduce(
      (sum, document) => sum + document.amount,
      0
    );
    const totalHyderabadAmount = hyderabadDocuments.reduce(
      (sum, document) => sum + document.amount,
      0
    );

    return { totalHajipurAmount, totalAgraAmount, totalHyderabadAmount };
  }

  // ###################### Update Nominee Details ##################

  async upsertNominee(userId: string, newNomineeData: NomineeInput) {
    const payload = { ...newNomineeData, userId };
    const updated_nominee = this.prisma.nominee.upsert({
      create: { ...payload },
      update: { ...payload },
      where: {
        userId: userId,
      },
    });
    return updated_nominee;
  }

  // #################################### Change Password ###########################################

  async changePassword(user, changePasswordValue: ChangePasswordInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      changePasswordValue.newPassword
    );

    const passwordValid = await this.passwordService.validatePassword(
      changePasswordValue.oldpassword,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }
    try {
      const updated_password = this.prisma.user.update({
        data: {
          password: hashedPassword,
        },
        where: {
          id: user.id,
        },
      });
      return updated_password;
    } catch (e) {}
  }

  // **************************
  async DeleteUser(user) {
    try {
      const getUser = await this.getUser(user.id);
      return getUser;
    } catch (err) {
      console.log(err);
    }
  }
  // **************************** Search Item ***************************

  async searchUsers(searchTerm: string): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            pw_id: {
              contains: searchTerm, // Match in PWID
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: searchTerm, // Match in Name
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        documents: true,
        nominee: true,
      },
    });
    return result;
  }

  // *************************** Users By Membership  ***************

  async usersByMembership(searchTerm: Membership, { skip, take }) {
    const allUser = this.prisma.user.findMany({
      take,
      skip,
      where: {
        membership: searchTerm,
      },
      include: {
        documents: true,
        nominee: true,
        KycAgency: true,
        DSCDetails: true,
        ProjectEnrolledStatus: true,
        shareHoldingType: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return allUser;
  }

  // ********************* Update License Validity ******************
  async updateLicenseDetails(payload: UpdateLicenseDetailsInput) {
    await this.prisma.kycAgency.update({
      where: {
        id: payload.id,
      },
      data: {
        licenseValidityInYear: payload.licenseValidityInYear,
      },
    });
  }

  // *****************
  async changeAmountofRamaeraLegal(totalactualReceived) {
    console.log(20000000 - totalactualReceived);
    await this.prisma.document.update({
      where: {
        id: 'clmossjgu0846luj4ssbnh9nm',
      },
      data: {
        amount: 20000000 - totalactualReceived,
      },
    });
  }

  //  *********
  async updateAgreemnetData(url, pwid) {
    return await this.prisma.aGREEMENT_DATA.update({
      data: {
        agreementUrl: url,
        isCompleted: true,
      },
      where: {
        pwId: pwid.toUpperCase(),
      },
    });
  }

  async checkAgreementStatus(pwid) {
    return await this.prisma.aGREEMENT_DATA.findUnique({
      where: {
        pwId: pwid,
      },
    });
  }
}
