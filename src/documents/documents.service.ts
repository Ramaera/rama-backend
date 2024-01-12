import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  UpdateDocumentStatusByAdmin,
  UpdateDocumentsInput,
} from './dto/update-document';

const DateInGmt530 = () => {
  // Create a new Date object for the current date and time
  const currentDate = new Date();

  // Get the current time in milliseconds since January 1, 1970
  const currentTimeInMilliseconds = currentDate.getTime();

  // Calculate the offset in milliseconds for GMT+5:30 (5 hours and 30 minutes)
  const offsetInMilliseconds = 5.5 * 60 * 60 * 1000;

  // Apply the offset to the current time
  const newDateWithOffset = new Date(
    currentTimeInMilliseconds + offsetInMilliseconds
  );

  return newDateWithOffset;
};

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
      data.approvalDocumentDate = DateInGmt530();
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

  // **********************

  async showDocumentDetails(id: string) {
    return await this.prisma.document.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  // *********************** List of Pending Tasks *************
  async listOfPendingtasks({ skip, take }) {
    const pendingTask = await this.prisma.document.findMany({
      skip,
      take,
      where: {
        status: 'PENDING',
      },
      include: {
        user: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    // console.log('pendingTask', pendingTask);

    return pendingTask;
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
