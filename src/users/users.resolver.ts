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
import {
  UpdateUserInputData,
  UpdateUserRoleInput,
} from './dto/update-user.input';
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
import {
  ProjectSubscriberCount,
  ShareHolderCountDTO,
  UserCountDTO,
} from './models/countUsers.model';
import { projectPaymentDTO } from './models/projectPayment.model';
import { Document } from 'src/documents/entities/document.entity';
import { ProjectEnrolled } from 'src/project-enrolled/entities/project-enrolled.entity';
import { UpdateDocumentUTRandAmountInput } from './dto/update-documentUTRandAmount.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { UpdateBasicDetailsInput } from './dto/update-BasicDetails.input';
import { UpdateDematDocumentsInput } from './dto/update-dematDocument.input';
import { UpdateNomineeDetailsInput } from './dto/update-nominee.input';
import { AgreementData } from './entities/agreementData.entity';
import { updateUserDemat } from './dto/update-user-demat.input';
import { BankDetailsInput } from './dto/create-bankDetails.input';
import { BankDetails } from './entities/bankDetails.entity';
import { STATUS } from '@prisma/client';
import { UpdateBankDetailsInput } from './dto/update-bankDetails.input';
import { AllBankDetails } from './entities/AllbankDetails.entity';

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

  @Query(() => User)
  async getUserDetails(@Args('id') id: string) {
    const userData = await this.usersService.getUser(id);
    return userData;
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
    @Args('data') newUserData: UpdateUserInputData
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  // ********************************* Updated  User details ********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUserDemat(
    @UserEntity() user: User,
    @Args('data') newUserData: updateUserDemat
  ) {
    return this.usersService.updateUserDemat(user.id, newUserData);
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

  //  ********************************** Update Document Details ***********************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Document)
  async updateDocumentByAdmin(@Args('data') data: UpdateDocumentInput) {
    return this.usersService.updateDocumentUrlByAdmin(data);
  }

  // *********************** Update Basic Details By Admin *******************************
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateBasicDetailsByAdmin(@Args('data') data: UpdateBasicDetailsInput) {
    return this.usersService.updateBasicDetailsByAdmin(data);
  }

  // *********************** Update Demat Details By Admin *******************************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateDematDetailsByAdmin(
    @Args('data') data: UpdateDematDocumentsInput
  ) {
    return this.usersService.updateDematDetailsByAdmin(data);
  }

  // ********************************* Update User Role *******************************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateuserRole(@Args('data') newUserData: UpdateUserRoleInput) {
    return this.usersService.updateUserRole(newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateNomineeDetailByAdmin(
    @Args('data') newUserData: UpdateNomineeDetailsInput
  ) {
    return this.usersService.updateNomineeDetailsByAdmin(newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Document)
  async updateDocumentUTR(@Args('data') data: UpdateDocumentUTRandAmountInput) {
    return this.usersService.updateDocumentmaountandUtr(data);
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

  //  ************************** Get All Users Count( With Basic Subscribers, Advance Subscribers) **************************

  @Query(() => UserCountDTO)
  async getAllUsersCount() {
    const totalUser = await this.usersService.getAllUsersCount();
    return {
      totalSubscribers: totalUser.totalSubscribers,
      totalBasicSubscribers: totalUser.totalBasicSubscribers,
      totalAdvanceSubscribers: totalUser.totalAdvanceSubscribers,
    };
  }
  @Query(() => ProjectSubscriberCount)
  async getProjectUserCount(@Args('title') title: string) {
    return await this.usersService.totalProjectSubscribers(title);
  }

  //  ************************** Get All Users Count( With Basic Subscribers, Advance Subscribers, Hajipur Subscribers, Agra Subscribers) **************************

  @Query(() => ShareHolderCountDTO)
  async getAllShareHoldersCount() {
    const allShareholders = await this.usersService.getAllShareHoldersCount();
    return {
      TotalShareholders: allShareholders.TotalShareholders,
      TotalBasicShareHolder: allShareholders.TotalBasicShareHolder,
      TotalAdvanceShareHolder: allShareholders.TotalAdvanceShareHolder,
      TotalHajipurShareHolder: allShareholders.TotalHajipurShareHolder,
    };
  }

  // ******************************* Amount Received Per Project ***************************
  @Query(() => projectPaymentDTO)
  async getProjectsPayment(@Args('projectName') projectName: string) {
    const totalpayment = await this.usersService.projectAmountReceived(
      projectName
    );

    return {
      ProjectAmountReceived: totalpayment.totalProjectAmount,
      // ProjectHajipurAmountReceived: totalpayment.totalHajipurAmount,
      // ProjectAgraAmountReceived: totalpayment.totalAgraAmount,
      // ProjectHyderabadAmountReceived: totalpayment.totalHyderabadAmount,
      // ProjectFundingReplacementAmountReceived:
      //   totalpayment.totalFundingReplacementAmount,
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

  // --------------------- Get User Agreement Data ----------------------\

  @Query(() => AgreementData)
  async getAgreementData(@Args('PWID') PWID: string) {
    return this.prisma.aGREEMENT_DATA.findUnique({
      where: {
        pwId: PWID,
      },
    });
  }

  // ****************************

  @Query(() => User)
  async ChangeAmountOfRamaeraLegalInfoTech() {
    let projectAmounts = await this.getProjectsPayment('hajipur');
    let hajipur_total_received = projectAmounts.ProjectAmountReceived;
    const _user = await this.usersService.changeAmountofRamaeraLegal(
      hajipur_total_received
    );
    return 'xx';
  }

  @Mutation(() => AgreementData)
  async UpdateAgreementData(
    @Args('url') agreementUrl: string,
    @Args('PWID') pwid: string
  ) {
    return this.usersService.updateAgreemnetData(agreementUrl, pwid);
  }

  @Mutation(() => AgreementData)
  async changeKyc500Status(@Args('id') userId: string) {
    return this.usersService.changeKyc500Status(userId);
  }

  @Query(() => AgreementData)
  async checkAgreementDataStatus(@Args('pwid') pwid: string) {
    return this.usersService.checkAgreementStatus(pwid);
  }

  @Mutation(() => BankDetails)
  async CreateBankDetails(@Args('data') data: BankDetailsInput) {
    return this.usersService.createBankDetails(data);
  }

  @Mutation(() => BankDetails)
  async updateBankDetails(@Args('data') data: UpdateBankDetailsInput) {
    return this.usersService.updateBankDetails(data);
  }


  @Mutation(() => User)
  async updateKyc500(@Args('id') userId: string) {
    return this.usersService.update500kyc(userId);
  }

  @Query(() => [AllBankDetails])
  async BankDetails(
    @Args({ name: 'take', type: () => Int, defaultValue: 100 }) take: number,
    @Args({ name: 'skip', type: () => Int, defaultValue: 0 }) skip: number
  ) {
    return this.usersService.getAllBankDetails(skip, take);
  }
}
