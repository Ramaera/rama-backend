import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
  Int,
} from '@nestjs/graphql';
import { ConflictException, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { KYCHANDLER, User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput, UpdateUserRoleInput } from './dto/update-user.input';
import {
  UpdateLicenseDetailsInput,
  UpdateNomineeInputByAdmin,
  UpdateSubKycStatus,
  UpdateUserInputByAdmin,
  UpdateUserMembershipAdmin,
  UpdateUserStatusAdmin,
} from './dto/update-user-Admin.input ';

// import { UpdateNomineeInput } from './dto/update-user.input';
import { NomineeInput, UpdatedData } from './dto/createNominee.input';
import { Nominee } from './entities/nominee.entity';
import { UserIdArgs } from './args/user-id.args';
import { DocumentModal } from 'src/documents/models/document.models';
import { SearchInput, SearchMembershipInput } from './dto/search-user.input';
import { UserCountDTO } from './models/countUsers.model';
import { projectPaymentDTO } from './models/projectPayment.model';
import { ProjectEnrolled } from 'src/project-enrolled/entities/project-enrolled.entity';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  // ********************************* Details about the User  ********************

  @Query(() => User)
  async me(@UserEntity() user: User) {
    const _user = await this.usersService.getUser(user.id);
    return _user;
  }

  // ********************************* Details about the  All User ********************

  @Query(() => [User])
  async getAllUser(
    @Args({ name: 'take', type: () => Int, defaultValue: 5000 }) take: number,
    @Args({ name: 'skip', type: () => Int, defaultValue: 0 }) skip: number
  ) {
    const _user = await this.usersService.getAllUser({ take, skip });

    return _user;
  }

  // ****************** KYC Handler *************************

  @Query(() => [KYCHANDLER])
  async getAllKycHandler() {
    const _kycHandler = await this.usersService.getKycHandler();
    return _kycHandler;
  }

  // ********************* Search User ********************************
  @Query(() => [User])
  async searchUsers(@Args('input') input: SearchInput): Promise<User[]> {
    return this.usersService.searchUsers(input.searchTerm);
  }

  // ********************************* Update Details by Admin ********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateDataByAdmin(
    @UserEntity() user: User,
    @Args('data')
    updatedData: UpdateUserInputByAdmin
  ) {
    if (user.role === 'ADMIN' || user.role === 'AGENT') {
      return this.usersService.updateDataByAdmin(updatedData);
    }
    throw new Error('Unauthorized');
  }

  // ********************************* Update Status by Admin ********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateStatus(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserStatusAdmin
  ) {
    if (user.role === 'ADMIN' || user.role === 'AGENT') {
      return this.usersService.updateStatus(user.id, newUserData);
    }
    throw new Error('Unauthorized');
  }

  // ********************************* Updated  User details ********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  // ********************************* Updated  Nominee details ********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Nominee)
  async upsertNominee(
    @UserEntity() user: User,
    @Args('data') newNomineeData: NomineeInput
  ) {
    return this.usersService.upsertNominee(user.id, newNomineeData);
  }

  // ******************************** Remove a User *********************************

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async DeleteUser(
    @UserEntity() user: User
    // @Args('data') data: UpdateUserInput
  ) {
    return this.usersService.DeleteUser(user.id);
  }

  // ********************************* Update User Role *******************************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateuserRole(@Args('data') newUserData: UpdateUserRoleInput) {
    return this.usersService.updateUserRole(newUserData);
  }

  // *****************************  Changed Password   *******************************

  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data')
    data: ChangePasswordInput
  ) {
    return this.usersService.changePassword(user, data);
  }

  // ************************* Nomineee Details  **************************************//
  @Query(() => Nominee)
  myNominee(@Args() id: UserIdArgs) {
    return this.prisma.user.findUnique({ where: { id: id.userId } }).nominee();
  }

  //  ************************** Get All Users Count( With Basic Subscribers, Advance Subscribers, Hajipur Subscribers, Agra Subscribers) **************************

  @Query(() => UserCountDTO)
  async getAllUsersCount() {
    const totalUser = await this.usersService.getAllUsersCount();
    return {
      totalSubscribers: totalUser.totalSubscribers,
      totalBasicSubscribers: totalUser.totalBasicSubscribers,
      totalAdvanceSubscribers: totalUser.totalAdvanceSubscribers,
      totalHajipurSubscribers: totalUser.totalHajipurSubscribers,
      totalAgraSubscribers: totalUser.totalAgraMartSubscribers,
    };
  }

  // ******************************* Amount Received Per Project ***************************
  @Query(() => projectPaymentDTO)
  async getProjectsPayment() {
    const totalpayment = await this.usersService.projectAmountReceived();

    return {
      ProjectHajipurAmountReceived: totalpayment.totalHajipurAmount,
      ProjectAgraAmountReceived: totalpayment.totalAgraAmount,
    };
  }

  // ******************************** Create Agency Code ***********************************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateMembership(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserMembershipAdmin
  ) {
    if (user.role === 'ADMIN' || user.role === 'AGENT') {
      return this.usersService.updateMembership(user.id, newUserData);
    }
    throw new Error('Unauthorized');
  }

  // *************************** Add  License Validity of Agency ***************************

  @Mutation(() => User)
  async UpdateLicenseDetails(@Args('data') data: UpdateLicenseDetailsInput) {
    return this.usersService.updateLicenseDetails(data);
  }

  // ********************************* List of As Per Subscribers Type ********************************************

  @Query(() => [User])
  async allKycUser(
    @Args('input') input: SearchMembershipInput,
    @Args({ name: 'take', type: () => Int, defaultValue: 100 }) take: number,
    @Args({ name: 'skip', type: () => Int, defaultValue: 0 }) skip: number
  ) {
    return this.usersService.usersByMembership(input.searchTerm, {
      skip,
      take,
    });
  }

  // ****************************

  @Query(() => User)
  async ChangeAmountOfRamaeraLegalInfoTech() {
    let projectAmounts = await this.getProjectsPayment();
    let hajipur_total_received = projectAmounts['ProjectHajipurAmountReceived'];
    const _user = await this.usersService.changeAmountofRamaeraLegal(
      hajipur_total_received
    );
    return 'xx';
  }
}
