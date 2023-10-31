import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  UpdateDocumentStatusByAdmin,
  UpdateDocumentsInput,
} from './dto/update-document';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  // ********************************    Update Documents       ******************************

  async updateDocuments(data: UpdateDocumentsInput) {
    data.status = 'PENDING';
    return this.prisma.document.update({
      data: { ...data },
      where: {
        id: data.id,
      },
    });
  }

  // ********************************    Update Document Status By Admin       ******************************

  async updateDocumentStatusByAdmin(data: UpdateDocumentStatusByAdmin) {
    if (data.status === 'APPROVED') {
      data.approvalDate = new Date().toLocaleDateString();
    }

    const documentPayload = {
      ...data,
    };

    return this.prisma.document.update({
      data: { ...documentPayload },
      where: {
        id: data.id,
      },
    });
  }

  // async updatePaymentName() {
  //   const users = this.prisma.user.findMany();

  //   (await users).map(async (user) => {
  //     const alldoc = await this.prisma.document.findMany({
  //       where: {
  //         userId: user.id,
  //       },
  //     });

  //     alldoc.map((doc) => {
  //       doc.title === 'hajipur_project_payment' ? console.log(doc.title) : '';
  //     });
  //   });

  //   return 'XX';
  // }

  // async updateProjectEnrollementStatus(userId) {
  //   this.prisma.projectEnrolledStatus.create({
  //     data: {
  //       id: userId,
  //       projectName: '',
  //     },
  //   });
  // }
}
