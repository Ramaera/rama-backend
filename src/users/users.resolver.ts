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
  // ****************************************************************************
  // ****************************************************************************
  @Query(() => User)
  async me(@UserEntity() user:User): Promise<User> {
    const _user = await this.usersService.getUser(user.id);
    return _user
  }

  // *****************************************************************************************************************************
// *****************************************************Noiminee Section*********************************



    // *********************************Updated  User details********************
  // ****************************************************************************
  // ****************************************************************************


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
  // ****************************************************************************
  // ****************************************************************************


  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(@UserEntity() user: User,@Args('data') changePassword: ChangePasswordInput) {
    return this.usersService.changePassword(user.id, changePassword);
      }



 
// Nomineee Details  // 
  @Query(() => [Nominee])
  myNominee(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .nominee();
  }
}


// **********************
// @UseGuards(GqlAuthGuard)
//   @Mutation(() => User)
//   async updateOrCreateNominee(
//     @UserEntity() user: User,
//     @Args('data') newUserData: UpdateUserInput
//   ) {
//     return this.usersService.updateUser(user.id, newUserData);
//   }