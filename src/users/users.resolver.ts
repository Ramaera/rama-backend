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
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateUserInputByAdmin, UpdateUserStatusAdmin } from './dto/update-user-Admin.input ';

// import { UpdateNomineeInput } from './dto/update-user.input';
import { NomineeInput } from './dto/createNominee.input';
import { Nominee } from './entities/nominee.entity';
import { UserIdArgs } from './args/user-id.args';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


// 
@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}


// *********************************Details about the User ********************

  @Query(() => User)
  async me(@UserEntity() user:User): Promise<User> {
    const _user = await this.usersService.getUser(user.id);
    return _user
  }





  @Query(() => [User])
  async getAllUser() {
    const _user = await this.usersService.getAllUser();
    return _user
  }


// *********************************Update Details by Admin ********************


@UseGuards(GqlAuthGuard)
@Mutation(() => User)
async updateUserByAdmin(
  @UserEntity() user: User,
  @Args('data') newUserData: UpdateUserInputByAdmin
) {
  newUserData.kyc="ONGOING"
  return this.usersService.updateUserByAdmin(newUserData);
}


@UseGuards(GqlAuthGuard)
@Mutation(() => User)
async updateStatus(
  @UserEntity() user: User,
  @Args('data') newUserData: UpdateUserStatusAdmin
) {
  if(user.role==="ADMIN"){
    return this.usersService.updateStatus(user.id, newUserData);

  }
  throw new Error("Unauthorized")
 

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
  // ****************************************************************************
  // ****************************************************************************


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
  @Args('data') 
  changePasswordValue: ChangePasswordInput) {
    return this.usersService.changePassword(changePasswordValue);
      }



 
// *************************Nomineee Details  **************************************// 
  @Query(() => [Nominee])
  myNominee(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .nominee();
  }
}
