import * as NestJsGraphql from '@nestjs/graphql'
import { AffectedRowsOutput } from '../common/outputs/AffectedRowsOutput.output'
import { Document } from '../models/document.model'
import {
  AggregateDocumentArgs,
  CreateManyDocumentArgs,
  CreateOneDocumentArgs,
  DeleteManyDocumentArgs,
  DeleteOneDocumentArgs,
  FindFirstDocumentArgs,
  FindManyDocumentArgs,
  FindUniqueDocumentArgs,
  GroupByDocumentArgs,
  UpdateManyDocumentArgs,
  UpdateOneDocumentArgs,
  UpsertOneDocumentArgs
} from './document.args'
import { DocumentService } from './document.service'
import { AggregateDocument } from './outputs/AggregateDocument.output'
import { DocumentGroupBy } from './outputs/DocumentGroupBy.output'

@NestJsGraphql.Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) { }

  @NestJsGraphql.Query(() => Document, { nullable: false })
  findFirstDocument(@NestJsGraphql.Args() args: FindFirstDocumentArgs) {
    return this.documentService.findFirst(args)
  }

  @NestJsGraphql.Query(() => Document, { nullable: false })
  findUniqueDocument(@NestJsGraphql.Args() args: FindUniqueDocumentArgs) {
    return this.documentService.findUnique(args)
  }

  @NestJsGraphql.Query(() => [Document], { nullable: false })
  findManyDocument(@NestJsGraphql.Args() args: FindManyDocumentArgs) {
    return this.documentService.findMany(args)
  }

  @NestJsGraphql.Query(() => [DocumentGroupBy], { nullable: false })
  groupByDocument(@NestJsGraphql.Args() args: GroupByDocumentArgs) {
    return this.documentService.groupBy(args)
  }

  @NestJsGraphql.Query(() => AggregateDocument, { nullable: false })
  aggregateDocument(@NestJsGraphql.Args() args: AggregateDocumentArgs) {
    return this.documentService.aggregate(args)
  }

  @NestJsGraphql.Mutation(() => Document, { nullable: true })
  createDocument(@NestJsGraphql.Args() args: CreateOneDocumentArgs) {
    return this.documentService.create(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  createManyDocument(@NestJsGraphql.Args() args: CreateManyDocumentArgs) {
    return this.documentService.createMany(args)
  }

  @NestJsGraphql.Mutation(() => Document, { nullable: true })
  updateDocument(@NestJsGraphql.Args() args: UpdateOneDocumentArgs) {
    return this.documentService.update(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  updateManyDocument(@NestJsGraphql.Args() args: UpdateManyDocumentArgs) {
    return this.documentService.updateMany(args)
  }

  @NestJsGraphql.Mutation(() => Document, { nullable: true })
  upsertDocument(@NestJsGraphql.Args() args: UpsertOneDocumentArgs) {
    return this.documentService.upsert(args)
  }

  @NestJsGraphql.Mutation(() => Document, { nullable: true })
  deleteDocument(@NestJsGraphql.Args() args: DeleteOneDocumentArgs) {
    return this.documentService.delete(args)
  }

  @NestJsGraphql.Mutation(() => AffectedRowsOutput, { nullable: true })
  deleteManyDocument(@NestJsGraphql.Args() args: DeleteManyDocumentArgs) {
    return this.documentService.deleteMany(args)
  }
}

