import { PrismaService } from 'nestjs-prisma';
import { ConflictException, Injectable } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NomineeInput } from './dto/createNominee.input';
import { Token } from "../../src/auth/models/token.model"
import { Prisma } from '@prisma/client';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UpdateKycHandlerInput } from './dto/update-kychandler.input';
import { UpdateUserStatusAdmin } from './dto/update-user-Admin.input ';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) { }

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



  async updateUserByAdmin(newUserData: UpdateUserInput) {
    const updated_user = this.prisma.user.update({
      data: newUserData,
      where: {
        id: newUserData.id,
      },
    });


    return updated_user;
    
  }

  async updateNomineeByAdmin(newUserData: UpdateUserInput) {
    const updated_user = this.prisma.user.update({
      data: newUserData,
      where: {
        id: newUserData.id,
      },
    });


    return updated_user;
    
  }

  

  

  async updateStatus(adminId: string,newUserData: UpdateUserStatusAdmin) {
    

    let user = await this.prisma.user.findFirst({
      where:{
        id:newUserData.id
      }
    })

    if(!user){
      throw new Error("User not found")
    }
    user.kyc = newUserData.kyc;
    const userPayload = {
      ...user
    }

    user = await this.prisma.user.update({
      where:{
        id:user.id
      },
      data:{
        ...userPayload
      }
    })


    const identifier = `${user.id}-${adminId}`
    let kycHandler = await this.prisma.kycHandler.findFirst({where:{identifier:identifier}})
    if(!kycHandler){
      const kycHandlerData = {
        identifier,
        userId:user.id,
        handlerId:adminId
      }

    await this.prisma.kycHandler.create({data:kycHandlerData});
    }
 


  return user
  }




  async getUser(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId }, 
      include: {
        nominee:true,
        documents:true,
      }
    })
    return user
  }


  // ##########get All User

  async getAllUser(){
    const allUser=this.prisma.user.findMany({
      include:{
        documents:true,
        nominee:true
      }
    }
    )
    
    return allUser
  }


// ###################### Update Nominee Details ##################

  async upsertNominee(userId: string, newNomineeData: NomineeInput) {
    const payload = { ...newNomineeData, userId }
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


  
  async changePassword(changePasswordValue: ChangePasswordInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      changePasswordValue.newPassword
    );
    try {
    const updated_password = this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        private_key:changePasswordValue.private_key
      }
    });
    return updated_password;
  }catch(e){
  }
  
}
}
