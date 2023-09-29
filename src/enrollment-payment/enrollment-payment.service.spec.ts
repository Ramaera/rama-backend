import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentPaymentService } from './enrollment-payment.service';

describe('EnrollmentPaymentService', () => {
  let service: EnrollmentPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollmentPaymentService],
    }).compile();

    service = module.get<EnrollmentPaymentService>(EnrollmentPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
