import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { KycAgencyService } from './kyc-agency.service';
import { AllKycAgency, KycAgency } from './entities/kyc-agency.entity';
import { CreateKycAgencyCodeInput } from './dto/create-kyc-agency.input';
import { UpdateKycAgencyInput } from './dto/update-kyc-agency.input';
import {
  GetAllUserofSpecificKycAgency,
  GetKycAgency,
} from './dto/get-kyc-agency.input';

@Resolver(() => KycAgency)
export class KycAgencyResolver {
  constructor(private readonly kycAgencyService: KycAgencyService) {}

  @Mutation(() => AllKycAgency)
  createKycAgency(
    @Args('data')
    data: CreateKycAgencyCodeInput
  ) {
    return this.kycAgencyService.create(data);
  }

  @Query(() => [KycAgency], { name: 'AllKycAgency' })
  findAll() {
    return this.kycAgencyService.findAll();
  }

  @Query(() => KycAgency, { name: 'kycAgency' })
  findOne(@Args() id: GetKycAgency) {
    return this.kycAgencyService.findOne(id);
  }

  @Mutation(() => KycAgency)
  updateKycAgency(
    @Args('updateKycAgencyInput') updateKycAgencyInput: UpdateKycAgencyInput
  ) {
    return this.kycAgencyService.update(
      updateKycAgencyInput.id,
      updateKycAgencyInput
    );
  }

  @Query(() => [KycAgency], { name: 'GetAllKycAgencyUser' })
  findAllKycAgnecyuser(@Args() code: GetAllUserofSpecificKycAgency) {
    return this.kycAgencyService.findAllKycAgnecyuser(code);
  }

  @Mutation(() => KycAgency)
  removeKycAgency(@Args('id', { type: () => Int }) id: number) {
    return this.kycAgencyService.remove(id);
  }
}
