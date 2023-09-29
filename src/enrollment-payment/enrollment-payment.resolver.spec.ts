import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentPaymentResolver } from './enrollment-payment.resolver';
import { EnrollmentPaymentService } from './enrollment-payment.service';

describe('EnrollmentPaymentResolver', () => {
  let resolver: EnrollmentPaymentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollmentPaymentResolver, EnrollmentPaymentService],
    }).compile();

    resolver = module.get<EnrollmentPaymentResolver>(EnrollmentPaymentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
