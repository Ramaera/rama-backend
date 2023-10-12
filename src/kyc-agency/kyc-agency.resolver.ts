import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { KycAgencyService } from './kyc-agency.service';
import { AllKycAgency, KycAgency } from './entities/kyc-agency.entity';
import { CreateKycAgencyCodeInput } from './dto/create-kyc-agency.input';
import { UpdateKycAgencyInput } from './dto/update-kyc-agency.input';
import {
  GetAllUserofSpecificKycAgency,
  GetKycAgency,
} from './dto/get-kyc-agency.input';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

import { User } from 'src/users/models/user.model';

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

  // @UseGuards(GqlAuthGuard)
  // @Mutation(() => AllKycAgency)
  // AgencyPayment(
  //   // @Args('data')
  //   // data: CreateKycAgencyCodeInput
  //   @UserEntity() user: User
  // ) {
  //   return this.kycAgencyService.agencyPayment(user.id);
  // }

  // @Query(() => [KycAgency], { name: 'kycVivek' })
  // findAllVivek() {
  //   return this.kycAgencyService.findVivek();
  // }

  @Query(() => [KycAgency], { name: 'AllKycAgency' })
  findAll() {
    return this.kycAgencyService.findAll();
  }

  @Query(() => KycAgency, { name: 'findAgency' })
  findAgency(@Args('AgencyCode', { type: () => String }) AgencyCode: string) {
    return this.kycAgencyService.findAgency(AgencyCode);
  }

  // @Query(() => [KycAgency], { name: 'TotalRegsiteredKYC' })
  // async findAllRegistered(
  //   @Args('month', { type: () => Int }) month: number,
  //   @Args('agencyCode', { type: () => String }) agencyCode: string
  // ) {
  //   const totalFinalApprovedInAgencyInSpecificMonth =
  //     await this.kycAgencyService.totalKycInaMonthByAgencyCode(
  //       month,
  //       agencyCode
  //     );
  //   return {
  //     totalFinalBASICApprovedInAgencyInSpecificMonth:
  //       totalFinalApprovedInAgencyInSpecificMonth.kycFinalBASICApproval,
  //     totalFinalADVANCEApprovedInAgencyInSpecificMonth:
  //       totalFinalApprovedInAgencyInSpecificMonth.kycFinalADVANCEApproval,
  //   };
  // }

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

  @Query(() => [User], { name: 'GetAllKycAgencyUser' })
  findAllKycAgnecyuser(@Args() code: GetAllUserofSpecificKycAgency) {
    return this.kycAgencyService.findAllKycAgnecyuser(code);
  }

  @Query(() => [User], { name: 'Report' })
  findReport() {
    return this.kycAgencyService.findReport();
  }

  // @Query(() => [User], { name: 'AgencyKycPayment' })
  // findAgencyKycPayment(
  //   @Args('month', { type: () => Int }) month: number,
  //   @Args('agencyCode', { type: () => String }) agencyCode: string
  // ) {
  //   return this.kycAgencyService.AgencyKYCPaymentInAMonth(month, agencyCode);
  // }

  @Mutation(() => KycAgency)
  removeKycAgency(@Args('id', { type: () => Int }) id: number) {
    return this.kycAgencyService.remove(id);
  }
}
