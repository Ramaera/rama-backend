import { PrismaService } from 'nestjs-prisma';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NomineeInput, UpdatedData } from './dto/createNominee.input';

import {
  UpdateNomineeInputByAdmin,
  UpdateSubKycStatus,
  UpdateUserInputByAdmin,
  UpdateUserStatusAdmin,
} from './dto/update-user-Admin.input ';
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

  async updateDataByAdmin(
    newData: UpdateUserInputByAdmin
  ) {
  
      const updated_details = this.prisma.user.update({
        where: {
          id: newData.id,
        },
        data: {
          name: newData.name,
          kyc:"ONGOING",
          email: newData.email,
          father_or_husband_name: newData.father_or_husband_name,
          mobile_number: newData.mobile_number,
          alternate_mobile_number: newData.alternate_mobile_number,
          date_of_birth: newData.date_of_birth,
          demat_account: newData.demat_account,
          documents:(newData.url && newData.documentId)?{
            update:{
                data:{
                  url:newData.url
                },
                where:{
                  id:newData.documentId
                }
            },
          
          }:undefined,
          nominee:(newData.nomineeName || newData.nomineeRelationship)? {
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
          }:undefined,
        
        },
        include: {
          nominee: true,
          documents:true
        },
      });
      return updated_details;
    




    return newData ;
  }

  // async updateUserByAdmin(newNomineeInput: NomineeInput) {
  //   // const updated_user = this.prisma.user.update({
  //   //   data: newUserData,
  //   //   where: {
  //   //     id: newUserData.id,
  //   //   },
  //   // });
  //   const nomine_updated = this.prisma.nominee.update({
  //     data: newNomineeInput,
  //     where: {
  //       id: newNomineeInput.id,
  //     },
  //   });

  //   return {
  //     // updated_user,
  //     nomine_updated,
  //   };
  // }

  // async updateNomineeByAdmin(newNomineeInput: NomineeInput) {
  //   const updated_user = this.prisma.user.update({
  //     data: newNomineeInput,
  //     where: {
  //       id: newNomineeInput.id,
  //     },
  //   });

  //   return updated_user;
  // }

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
    let kycHandler = await this.prisma.kycHandler.findFirst({
      where: { identifier: identifier },
    });
    if (!kycHandler) {
      const kycHandlerData = {
        identifier,
        userId: user.id,
        handlerId: adminId,
      };

      await this.prisma.kycHandler.create({ data: kycHandlerData });
    }

    return user;
  }

// async createSubKycStatus(newUserData:UpdateSubKycStatus){

// const subKyc=await this.prisma.subKyc.findFirst({
//   where:{
//     userId:newUserData.id
//   }
// })

//   const updated_nominee = this.prisma.subKyc.upsert({
//     create: newUserData,
//     update: newUserData,
//     where: {
//       id: newUserData.id,
//     },
//   });
//   return updated_nominee;

// }

  async updateSubKycStatus( newUserData: UpdateSubKycStatus) {
   let subKycStatus= await this.prisma.subKyc.findFirst({
      where :{
        AND:[
          {userId:newUserData.id},
          {fieldName:newUserData.fieldName}
        ]  
      },
    })
  subKycStatus.fieldStatus=newUserData.fieldStatus    
    return subKycStatus;
  }







  async getUser(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        nominee: true,
        documents: true,
      },
    });
    return user;
  }

  // ##########get All User

  async getAllUser() {
    const allUser = this.prisma.user.findMany({
      include: {
        documents: true,
        nominee: true,
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

  // ###################################################################################################
  // #################################### Change Password ###########################################
  // ###############################################################################################

  async changePassword(user,changePasswordValue: ChangePasswordInput) {


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
          id : user.id,
        },
      });
      return updated_password;
    } catch (e) {}
  }
}
