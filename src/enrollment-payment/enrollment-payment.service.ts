import { Injectable } from '@nestjs/common';
import { CreateEnrollmentPaymentInput } from './dto/create-enrollment-payment.input';
import { UpdateEnrollmentPaymentInput } from './dto/update-enrollment-payment.input';
import { PrismaService } from 'nestjs-prisma';
import { start } from 'repl';

@Injectable()
export class EnrollmentPaymentService {
  constructor(private prisma: PrismaService) {}

  create(createEnrollmentPaymentInput: CreateEnrollmentPaymentInput) {
    return 'This action adds a new enrollmentPayment';
  }

  findAllEnrolled(month, year) {
    const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    return this.prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  }

  findAllApproved(month, year) {
    const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    return this.prisma.user.findMany({
      where: {
        kycApprovalDate: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  }

  // findAllApproved(month, year) {
  //   const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
  //   const endDate = new Date(startDate);
  //   endDate.setMonth(startDate.getMonth() + 1);
  //   return this.prisma.user.findMany({
  //     where: {
  //       kycApprovalDate: {
  //         gte: startDate,
  //         lt: endDate,
  //       },
  //     },
  //   });
  // }

  findOne(id: number) {
    return `This action returns a #${id} enrollmentPayment`;
  }

  update(
    id: number,
    updateEnrollmentPaymentInput: UpdateEnrollmentPaymentInput
  ) {
    return `This action updates a #${id} enrollmentPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollmentPayment`;
  }
}
