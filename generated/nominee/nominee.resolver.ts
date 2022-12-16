import * as NestJsGraphql from '@nestjs/graphql'
import { AffectedRowsOutput } from '../common/outputs/AffectedRowsOutput.output'
import { Nominee } from '../models/nominee.model'
import {
  AggregateNomineeArgs,
  CreateManyNomineeArgs,
  CreateOneNomineeArgs,
  DeleteManyNomineeArgs,
  DeleteOneNomineeArgs,
  FindFirstNomineeArgs,
  FindManyNomineeArgs,
  FindUniqueNomineeArgs,
  GroupByNomineeArgs,
  UpdateManyNomineeArgs,
  UpdateOneNomineeArgs,
  UpsertOneNomineeArgs
} from './nominee.args'
import { NomineeService } from './nominee.service'
import { AggregateNominee } from './outputs/AggregateNominee.output'
import { NomineeGroupBy } from './outputs/NomineeGroupBy.output'

@NestJsGraphql.Resolver(() => Nominee)
export class NomineeResolver {
  constructor(private readonly nomineeService: NomineeService) { }

  @NestJsGraphql.Query(() => Nominee, { nullable: false })
  findFirstNominee(@NestJsGraphql.Args() args: FindFirstNomineeArgs) {
    return this.nomineeService.findFirst(args)
  }

  @NestJsGraphql.Query(() => Nominee, { nullable: false })
  findUniqueNominee(@NestJsGraphql.Args() args: FindUniqueNomineeArgs) {
    return this.nomineeService.findUnique(args)
  }

  @NestJsGraphql.Query(() => [Nominee], { nullable: false })
  findManyNominee(@NestJsGraphql.Args() args: FindManyNomineeArgs) {
    return this.nomineeService.findMany(args)
  }

  @NestJsGraphql.Query(() => [NomineeGroupBy], { nullable: false })
  groupByNominee(@NestJsGraphql.Args() args: GroupByNomineeArgs) {
    return this.nomineeService.groupBy(args)
  }

  @NestJsGraphql.Query(() => AggregateNominee, { nullable: false })
  aggregateNominee(@NestJsGraphql.Args() args: AggregateNomineeArgs) {
    return this.nomineeService.aggregate(args)
  }

  @NestJsGraphql.Mutation(() => Nominee, { nullable: true })
  createNominee(@NestJsGraphql.Args() args: CreateOneNomineeArgs) {
    return this.nomineeService.create(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  createManyNominee(@NestJsGraphql.Args() args: CreateManyNomineeArgs) {
    return this.nomineeService.createMany(args)
  }

  @NestJsGraphql.Mutation(() => Nominee, { nullable: true })
  updateNominee(@NestJsGraphql.Args() args: UpdateOneNomineeArgs) {
    return this.nomineeService.update(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  updateManyNominee(@NestJsGraphql.Args() args: UpdateManyNomineeArgs) {
    return this.nomineeService.updateMany(args)
  }

  @NestJsGraphql.Mutation(() => Nominee, { nullable: true })
  upsertNominee(@NestJsGraphql.Args() args: UpsertOneNomineeArgs) {
    return this.nomineeService.upsert(args)
  }

  @NestJsGraphql.Mutation(() => Nominee, { nullable: true })
  deleteNominee(@NestJsGraphql.Args() args: DeleteOneNomineeArgs) {
    return this.nomineeService.delete(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  deleteManyNominee(@NestJsGraphql.Args() args: DeleteManyNomineeArgs) {
    return this.nomineeService.deleteMany(args)
  }
}

