import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateNomineeInput } from './dto/update-user.input';
import { CreateNomineeInput } from './dto/createNominee.input';
import { nominee } from './entities/nominee.entity';
import { UserIdArgs } from './args/user-id.args';


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
  @Query(()=>nominee)
  async me(@UserEntity() user:User): Promise<User> {

    return (user);
  }

  // ******************************************************
// ******************************************************
// **************Create Nominee************************
// ****************************************************** 
// ******************************************************


@UseGuards(GqlAuthGuard)   // Gql Authentication Guards
@Mutation(() => nominee) 
async createNominee(       
  @UserEntity()
  user:User,
  @Args('data') 
  data: CreateNomineeInput
  ) 
  {
    const newNominee=this.prisma.nominee.create({
      data:{
        name:data.name,
        relationship:data.relationship,
        userId:user.id
      }
    })
  return newNominee
}

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
  @Mutation(() => nominee)
  async updateNominee(
    @UserEntity() user: User,
    @Args('data') newNomineeData: UpdateNomineeInput
  ) {
    return this.usersService.updateNominee(user.id, newNomineeData);
  }

   // *********************************Mutation command  about the Changed Password   ********************
  // ****************************************************************************
  // ****************************************************************************


  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(@UserEntity() user: User,@Args('data') changePassword: ChangePasswordInput) {
    return this.usersService.changePassword(user.id, changePassword);
      }
   // *********************************Mutation command  about the new Password   ********************
  // ****************************************************************************
  // ****************************************************************************


 
  
  @Query(() => [nominee])
  myNominee(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .nominee();
  }

  // @ResolveField('author',()=>User)
  // documents(@Parent() user: User) {
  //   return this.prisma.user.findUnique({ where: { id: user.id } }).documents();
  // }
}
