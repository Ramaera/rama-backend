import { PrismaService } from 'nestjs-prisma';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput, UpdateUserRoleInput } from './dto/update-user.input';
import { NomineeInput } from './dto/createNominee.input';
import { saveAs } from 'file-saver';

import {
  UpdateLicenseDetailsInput,
  UpdateSubKycStatus,
  UpdateUserInputByAdmin,
  UpdateUserMembershipAdmin,
  UpdateUserStatusAdmin,
} from './dto/update-user-Admin.input ';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  // ************************* Update User Details *****************

  async updateUser(userId: string, newUserData: UpdateUserInput) {
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
          (newData.url || newData.amount) && newData.documentId
            ? {
                update: {
                  data: {
                    utrNo: newData.utrNo,
                    url: newData.url,
                    amount: newData.amount,
                  },
                  where: {
                    id: newData.documentId,
                  },
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

  // *****************************************************

  // async updateSubKycStatus(newUserData: UpdateSubKycStatus) {
  //   let subKycStatus = await this.prisma.subKyc.findFirst({
  //     where: {
  //       AND: [{ userId: newUserData.id }, { fieldName: newUserData.fieldName }],
  //     },
  //   });
  //   subKycStatus.fieldStatus = newUserData.fieldStatus;
  //   return subKycStatus;
  // }

  // ***************************** Get User Details By Id    ************************
  async getUser(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        nominee: true,
        documents: true,
        KycAgency: true,
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
    const allUser = this.prisma.user.findMany({
      take,
      skip,
      include: {
        documents: true,
        nominee: true,
        KycAgency: true,
      },
    });

    return allUser;
  }

  // ************************* Hajipur Project User ***********************

  async getAllHajipurProjectUser() {
    // const allUser = await this.prisma.user.findUnique({
    //   where: {
    //     documents: {
    //       some: {
    //         title: {
    //           contains: 'hajipur',
    //         },
    //       },
    //     },
    //   },
    //   include: {
    //     documents: true,
    //   },
    // });

    const allUser = await this.prisma.document.findMany({
      where: {
        title: 'hajipur_project_payment',
      },
      include: {
        user: true,
      },
    });
    console.log('---->>', allUser.length);
    return allUser;
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
      // console.log(typeof getUser);
      // var blob = new Blob(['Hello, world!'], {
      //   type: 'text/csv;charset=utf-8',
      // });
      // var FileSaver = require('file-saver');
      // console.log('---->>>', blob);
      // FileSaver.saveAs(blob, 'hello_world.txt');

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
            },
          },
          {
            name: {
              contains: searchTerm, // Match in Name
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
}
