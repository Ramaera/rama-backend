import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EnrollmentPaymentService } from './enrollment-payment.service';
import { EnrollmentPayment } from './entities/enrollment-payment.entity';
import { CreateEnrollmentPaymentInput } from './dto/create-enrollment-payment.input';
import { UpdateEnrollmentPaymentInput } from './dto/update-enrollment-payment.input';

@Resolver(() => EnrollmentPayment)
export class EnrollmentPaymentResolver {
  constructor(
    private readonly enrollmentPaymentService: EnrollmentPaymentService
  ) {}

  @Mutation(() => EnrollmentPayment)
  createEnrollmentPayment(
    @Args('createEnrollmentPaymentInput')
    createEnrollmentPaymentInput: CreateEnrollmentPaymentInput
  ) {
    return this.enrollmentPaymentService.create(createEnrollmentPaymentInput);
  }

  @Query(() => [EnrollmentPayment], {
    name: 'Total_Subscribers_enrolled_in_a_month',
  })
  findAll(
    @Args('month', { type: () => Int }) month: number,
    @Args('year', { type: () => Int }) year: number
  ) {
    return this.enrollmentPaymentService.findAllEnrolled(month, year);
  }

  @Query(() => [EnrollmentPayment], {
    name: 'Total_Approved_Subscribers_in_a_month',
  })
  findApprovedKYC(
    @Args('month', { type: () => Int }) month: number,
    @Args('year', { type: () => Int }) year: number
  ) {
    return this.enrollmentPaymentService.findAllApproved(month, year);
  }

  @Query(() => EnrollmentPayment, { name: 'enrollmentPayment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.enrollmentPaymentService.findOne(id);
  }

  @Mutation(() => EnrollmentPayment)
  updateEnrollmentPayment(
    @Args('updateEnrollmentPaymentInput')
    updateEnrollmentPaymentInput: UpdateEnrollmentPaymentInput
  ) {
    return this.enrollmentPaymentService.update(
      updateEnrollmentPaymentInput.id,
      updateEnrollmentPaymentInput
    );
  }

  @Mutation(() => EnrollmentPayment)
  removeEnrollmentPayment(@Args('id', { type: () => Int }) id: number) {
    return this.enrollmentPaymentService.remove(id);
  }
}
