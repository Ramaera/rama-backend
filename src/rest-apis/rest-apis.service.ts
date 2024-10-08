import { Injectable } from '@nestjs/common';
import { CreateRestApiDto } from './dto/create-rest-api.dto';
import { UpdateRestApiDto } from './dto/update-rest-api.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RestApisService {
  constructor(private prisma: PrismaService) {}

  create(createRestApiDto: CreateRestApiDto) {
    return 'This action adds a new restApi';
  }

  findAll() {
    return this.prisma.user
      .findMany({
        select: {
          name: true,
          pw_id: true,
          kyc: true,
          createdAt: true,
          membership: true,
          referralAgencyCode: true,
          ProjectEnrolledStatus: true,
          documents: {
            select: {
              title: true,
              status: true,
              amount: true,
              // approvalDocumentDate: true,
            },
            // where: {
            //   title: 'demat_document',
            // },
          },
        },
      })
      .then((users) => {
        // Map over the array of user objects
        return users.map((user) => {
          // Check if there is a demat document for this user
          const dematDocument = user.documents.find(
            (doc) => doc.title === 'demat_document'
          );

          // Set DematStatus accordingly
          let DematStatus = 'Pending';
          if (dematDocument) {
            if (dematDocument.status === 'APPROVED') {
              // If demat document exists and is approved, set DematStatus to 'Approved'
              DematStatus = 'Approved';
            }
          }

          // Add DematStatus field to the user object
          const newUser = { ...user, DematStatus };

          // If demat document exists and is approved, create a new column
          if (DematStatus === 'APPROVED') {
            newUser.DematStatus = 'APPROVED';
          }

          return newUser;
        });
      })
      .then((data) => {
        return data.map((user) => {
          const totalEnrolledInProjects = this.getEnrolledProjectsCount(
            user.documents
          );
          const newData = { ...user, totalEnrolledInProjects };

          return newData;
        });
      });
  }

  getEnrolledProjectsCount(documents) {
    let enrolledProjects = 0;
    documents.map((doc) => {
      if (
        doc.title === 'hajipur_project_payment' &&
        doc.status === 'APPROVED'
      ) {
        enrolledProjects = enrolledProjects + 1;
      }
      if (doc.title === 'agra_project_payment' && doc.status === 'APPROVED') {
        enrolledProjects = enrolledProjects + 1;
      }
      if (
        doc.title === 'hyderabad_project_payment' &&
        doc.status === 'APPROVED'
      ) {
        enrolledProjects = enrolledProjects + 1;
      }
      if (doc.title === 'chapra_project_payment' && doc.status === 'APPROVED') {
        enrolledProjects = enrolledProjects + 1;
      }
      if (doc.title === 'jhansi_project_payment' && doc.status === 'APPROVED') {
        enrolledProjects = enrolledProjects + 1;
      }
    });

    return enrolledProjects;
  }

  findOne(id: number) {
    return `This action returns a #${id} restApi`;
  }

  update(id: number, updateRestApiDto: UpdateRestApiDto) {
    return `This action updates a #${id} restApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} restApi`;
  }
}
