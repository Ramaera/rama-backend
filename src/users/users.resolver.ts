import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { ConflictException, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { KYCHANDLER, User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import {
  UpdateNomineeInputByAdmin,
  UpdateSubKycStatus,
  UpdateUserInputByAdmin,
  UpdateUserStatusAdmin,
} from './dto/update-user-Admin.input ';

// import { UpdateNomineeInput } from './dto/update-user.input';
import { NomineeInput, UpdatedData } from './dto/createNominee.input';
import { Nominee } from './entities/nominee.entity';
import { UserIdArgs } from './args/user-id.args';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  // *********************************Details about the User ********************

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    const _user = await this.usersService.getUser(user.id);
    return _user;
  }

  @Query(() => [User])
  async getAllUser() {
    const _user = await this.usersService.getAllUser();
    return _user;
  }

  @Query(() => [KYCHANDLER])
  async getAllKycHandler() {
    const _kycHandler = await this.usersService.getKycHandler();
    return _kycHandler;
  }

  // *********************************Update Details by Admin ********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateDataByAdmin(
    @UserEntity() user: User,
    @Args('data')
    updatedData: UpdateUserInputByAdmin
  ) {
    if (user.role === 'ADMIN') {
      return this.usersService.updateDataByAdmin(updatedData);
    }
    throw new Error('Unauthorized');
  }

  // *********************************Update Status by Admin ********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateStatus(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserStatusAdmin
  ) {
    if (user.role === 'ADMIN') {
      return this.usersService.updateStatus(user.id, newUserData);
    }
    throw new Error('Unauthorized');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateSubKycStatus(
    @UserEntity() user: User,
    @Args('data') newKycData: UpdateSubKycStatus
  ) {
    if (user.role === 'ADMIN') {
      return this.usersService.updateSubKycStatus(newKycData);
    }
    throw new Error('Unauthorized');
  }

  // *********************************Updated  User details********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  // *********************************Updated  Nominee details********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Nominee)
  async upsertNominee(
    @UserEntity() user: User,
    @Args('data') newNomineeData: NomineeInput
  ) {
    return this.usersService.upsertNominee(user.id, newNomineeData);
  }

  // *********************************Mutation command  about the Changed Password   ********************
  // ******************************************************************************************
  // ***************************************************************************************

  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data')
    data: ChangePasswordInput
  ) {
    return this.usersService.changePassword(user, data);
  }

  // *************************Nomineee Details  **************************************//
  @Query(() => Nominee)
  myNominee(@Args() id: UserIdArgs) {
    return this.prisma.user.findUnique({ where: { id: id.userId } }).nominee();
  }
}
