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

import {
  UpdateSubKycStatus,
  UpdateUserInputByAdmin,
  UpdateUserStatusAdmin,
} from './dto/update-user-Admin.input ';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  // ###############################################################
  // ################################################################
  // ################################################################
  // ########################## Update User Details ##################
  // ################################################################
  // ###############################################################
  // ##################################################################

  async updateUser(userId: string, newUserData: UpdateUserInput) {
    const updated_user = this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });

    return updated_user;
  }

  async updateUserRole(newUserData: UpdateUserRoleInput) {
    console.log('checl', newUserData.role);
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

  async updateDataByAdmin(newData: UpdateUserInputByAdmin) {
    const updated_details = this.prisma.user.update({
      where: {
        id: newData.id,
      },
      data: {
        name: newData.name,
        kyc: 'ONGOING',
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

    // return newData;
  }

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

  async updateSubKycStatus(newUserData: UpdateSubKycStatus) {
    let subKycStatus = await this.prisma.subKyc.findFirst({
      where: {
        AND: [{ userId: newUserData.id }, { fieldName: newUserData.fieldName }],
      },
    });
    subKycStatus.fieldStatus = newUserData.fieldStatus;
    return subKycStatus;
  }

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

  async getKycHandler() {
    return await this.prisma.kycHandler.findMany({});
  }

  // ##########get All User

  async getAllUser() {
    const allUser = this.prisma.user.findMany({
      include: {
        documents: true,
        nominee: true,
        KycAgency: true,
      },
    });

    return allUser;
  }

  async getAllHajipurProjectUser() {
    const allUser = this.prisma.user.findMany({
      where: {
        documents: {
          some: {
            title: {
              contains: 'Hajipur',
            },
          },
        },
      },
    });

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
}
