import * as NestJsGraphql from '@nestjs/graphql'
import { AffectedRowsOutput } from '../common/outputs/AffectedRowsOutput.output'
import { User } from '../models/user.model'
import { AggregateUser } from './outputs/AggregateUser.output'
import { UserGroupBy } from './outputs/UserGroupBy.output'
import {
  AggregateUserArgs,
  CreateManyUserArgs,
  CreateOneUserArgs,
  DeleteManyUserArgs,
  DeleteOneUserArgs,
  FindFirstUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  GroupByUserArgs,
  UpdateManyUserArgs,
  UpdateOneUserArgs,
  UpsertOneUserArgs
} from './user.args'
import { UserService } from './user.service'

@NestJsGraphql.Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @NestJsGraphql.Query(() => User, { nullable: false })
  findFirstUser(@NestJsGraphql.Args() args: FindFirstUserArgs) {
    return this.userService.findFirst(args)
  }

  @NestJsGraphql.Query(() => User, { nullable: false })
  findUniqueUser(@NestJsGraphql.Args() args: FindUniqueUserArgs) {
    return this.userService.findUnique(args)
  }

  @NestJsGraphql.Query(() => [User], { nullable: false })
  findManyUser(@NestJsGraphql.Args() args: FindManyUserArgs) {
    return this.userService.findMany(args)
  }

  @NestJsGraphql.Query(() => [UserGroupBy], { nullable: false })
  groupByUser(@NestJsGraphql.Args() args: GroupByUserArgs) {
    return this.userService.groupBy(args)
  }

  @NestJsGraphql.Query(() => AggregateUser, { nullable: false })
  aggregateUser(@NestJsGraphql.Args() args: AggregateUserArgs) {
    return this.userService.aggregate(args)
  }

  @NestJsGraphql.Mutation(() => User, { nullable: true })
  createUser(@NestJsGraphql.Args() args: CreateOneUserArgs) {
    return this.userService.create(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  createManyUser(@NestJsGraphql.Args() args: CreateManyUserArgs) {
    return this.userService.createMany(args)
  }

  @NestJsGraphql.Mutation(() => User, { nullable: true })
  updateUser(@NestJsGraphql.Args() args: UpdateOneUserArgs) {
    return this.userService.update(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  updateManyUser(@NestJsGraphql.Args() args: UpdateManyUserArgs) {
    return this.userService.updateMany(args)
  }

  @NestJsGraphql.Mutation(() => User, { nullable: true })
  upsertUser(@NestJsGraphql.Args() args: UpsertOneUserArgs) {
    return this.userService.upsert(args)
  }

  @NestJsGraphql.Mutation(() => User, { nullable: true })
  deleteUser(@NestJsGraphql.Args() args: DeleteOneUserArgs) {
    return this.userService.delete(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  deleteManyUser(@NestJsGraphql.Args() args: DeleteManyUserArgs) {
    return this.userService.deleteMany(args)
  }
}

