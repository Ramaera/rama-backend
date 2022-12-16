import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import {ChangePasswordInput} from './dto/change-password.input';
import { UpdateUserInput,UpdateNomineeInput} from './dto/update-user.input'; 

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

    // ###############################################################
  // ################################################################
  // ################################################################
  // ########################## Update Nominee Details ##################
  // ################################################################
  // ###############################################################
  // ##################################################################

  async updateNominee(userId: string, newNomineeData: UpdateNomineeInput) {
    const updated_nominee = this.prisma.nominee.update({
      data: newNomineeData,
      where: {
        id: userId,
      },
    });
    return updated_nominee;
  }


  // ##################################################################
  // ##################################################################
  // ##################################################################
  // ########################## New Password ##########################
  // ##################################################################
  // ##################################################################
  // ##################################################################

  async newPassword(id: string, newchangedpassword: ChangePasswordInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      newchangedpassword.newPassword
    );
    const updated_password = this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: id,
      },
    });

    return updated_password;
  }


  // ##################################################################
  // ##################################################################
  // ##################################################################
  // ########################## Change Password #######################
  // ##################################################################
  // ##################################################################
  // ##################################################################

  async changePassword(userId: string, changePassword: ChangePasswordInput) {
    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );
    const updated_password = this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: userId,
      },
    });
    return updated_password;
  }
}
