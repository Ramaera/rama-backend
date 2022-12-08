import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';

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
  const updated_user=this.prisma.user.update({
    data: newUserData,
    where: {
      id: userId,
    },
  });
    return updated_user
  }

  // ##################################################################
  // ##################################################################
  // ##################################################################
  // ########################## New Password ##########################
  // ##################################################################
  // ##################################################################
  // ##################################################################


  async newPassword( pw_id:string, newchangedpassword:ChangePasswordInput){
      const hashedPassword=await this.passwordService.hashPassword(newchangedpassword.newPassword)
      const updated_password=this.prisma.user.update({
        data:{
          password:hashedPassword,
        },
        where:{
          id:pw_id
        },
      })
      return updated_password
    }


  // ##################################################################
  // ##################################################################
  // ##################################################################
  // ########################## Change Password #######################
  // ##################################################################
  // ##################################################################
  // ##################################################################

  async changePassword( userId: string, changePassword: ChangePasswordInput) {
    const hashedPassword = await this.passwordService.hashPassword(changePassword.newPassword);
    const updated_password=this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: { 
        id: userId
       },
    });
    return updated_password
  }
}
