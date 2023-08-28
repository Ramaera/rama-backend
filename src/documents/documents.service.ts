import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  UpdateDocumentStatusByAdmin,
  UpdateDocumentsInput,
} from './dto/update-document';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}
  // *****************************************
  // *******************************************
  // **********Update Documents*****************
  // *******************************************

  async updateDocuments(data: UpdateDocumentsInput) {
    data.status = 'PENDING';
    return this.prisma.document.update({
      data: { ...data },
      where: {
        id: data.id,
      },
    });
  }

  async updateDocumentStatusByAdmin(data: UpdateDocumentStatusByAdmin) {
    return this.prisma.document.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async updatePaymentName() {
    const users = this.prisma.user.findMany();

    (await users).map(async (user) => {
      const alldoc = await this.prisma.document.findMany({
        where: {
          userId: user.id,
        },
      });

      alldoc.map((doc) => {
        doc.title === 'hajipur_project_payment' ? console.log(doc.title) : '';
      });
    });

    return 'XX';
  }
}
