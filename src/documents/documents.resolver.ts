import {
  Resolver,
  Subscription,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Int,
} from '@nestjs/graphql';
import { Document } from './entities/document.entity';
import { CreateDocumentInput } from './dto/createDocument.input';
import { PrismaService } from 'nestjs-prisma';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { DocumentsService } from './documents.service';
import {
  UpdateDocumentStatusByAdmin,
  UpdateDocumentsInput,
} from './dto/update-document';
import { DocumentIdArgs } from './args/document-id.args';
import { User } from 'src/users/models/user.model';
import { UserIdArgs } from 'src/users/args/user-id.args';

@Resolver(() => Document)
export class DocumentsResolver {
  constructor(
    private documentsService: DocumentsService,
    private prisma: PrismaService
  ) {}

  // ******************************************************
  // ******************************************************
  // **************Create Documents************************
  // ******************************************************
  // ******************************************************

  @UseGuards(GqlAuthGuard) // Gql Authentication Guards
  @Mutation(() => Document) // Mutation  --> Document Object Types (title , url)
  async createDocument(
    @UserEntity()
    user: User,
    @Args('data')
    data: CreateDocumentInput
  ) {
    const newDocument = this.prisma.document.create({
      data: {
        title: data.title,
        url: data.url,
        userId: user.id,
      },
    });

    return newDocument;
  }

  // ***************************************
  // ****************************************
  // ********Update Documents********************
  // ********************************************
  // *********************************************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Document)
  async updateDocument(
    @UserEntity()
    user: User,
    @Args('data')
    data: UpdateDocumentsInput
  ) {
    return this.documentsService.updateDocuments(data);
  }
  // ********************************************
  // ********************************************
  // ********************************************

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Document)
  async updateDocumentStatusByAdmin(
    @UserEntity()
    user: User,
    @Args('data')
    data: UpdateDocumentStatusByAdmin
  ) {
    try {
      if (user.role === 'ADMIN' || user.role === 'AGENT') {
        return this.documentsService.updateDocumentStatusByAdmin(data);
      }
    } catch (error) {
      console.log('UNAUTHORIZED');
    }
  }

  @Query(() => [Document])
  myDocuments(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .documents();
  }

  // Todo Need Authentication
  // @Query(() => Document)
  //     async document(@Args() id: DocumentIdArgs) {
  //       return this.prisma.document.findUnique({ where: { id: id.documentId } });
  // }
}
