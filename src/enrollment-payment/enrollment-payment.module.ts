import { Module } from '@nestjs/common';
import { EnrollmentPaymentService } from './enrollment-payment.service';
import { EnrollmentPaymentResolver } from './enrollment-payment.resolver';

@Module({
  providers: [EnrollmentPaymentResolver, EnrollmentPaymentService]
})
export class EnrollmentPaymentModule {}
