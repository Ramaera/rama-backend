import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { KycAgencyService } from './kyc-agency.service';
import {
  AllKycAgency,
  KYCAGENYCPAYMENT,
  KycAgency,
} from './entities/kyc-agency.entity';
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

  // ********************* Create Kyc Agency *********************

  @Mutation(() => AllKycAgency)
  createKycAgency(
    @Args('data')
    data: CreateKycAgencyCodeInput
  ) {
    return this.kycAgencyService.create(data);
  }

  // ********************* Get All Kyc Agency *********************

  @Query(() => [KycAgency], { name: 'AllKycAgency' })
  findAll() {
    return this.kycAgencyService.findAll();
  }

  //  **************** Find a Particular Agency By Agency Code ********************

  @Query(() => KycAgency, { name: 'findAgency' })
  findAgency(@Args('AgencyCode', { type: () => String }) AgencyCode: string) {
    return this.kycAgencyService.findAgency(AgencyCode);
  }

  //  **************** Find a Particular Agency By  User id ********************

  @Query(() => KycAgency, { name: 'kycAgency' })
  findOne(@Args() id: GetKycAgency) {
    return this.kycAgencyService.findOne(id);
  }

  // @Mutation(() => KycAgency)
  // updateKycAgency(
  //   @Args('updateKycAgencyInput') updateKycAgencyInput: UpdateKycAgencyInput
  // ) {
  //   return this.kycAgencyService.update(
  //     updateKycAgencyInput.id,
  //     updateKycAgencyInput
  //   );
  // }

  // **************** Find All users Inside a KYC Agency  *************************

  @Query(() => [User], { name: 'GetAllKycAgencyUser' })
  findAllKycAgnecyuser(@Args() code: GetAllUserofSpecificKycAgency) {
    return this.kycAgencyService.findAllKycAgnecyuser(code);
  }

  @Query(() => [User], { name: 'Report' })
  findReport() {
    return this.kycAgencyService.findReport();
  }

  // ****************** Agency Payment **************************************

  @Query(() => KYCAGENYCPAYMENT, { name: 'AgencyPayment' })
  findAgencyPaymentt(
    @Args('month', { type: () => Int }) month: number,
    @Args('agencyCode', { type: () => String }) agencyCode: string,
    @Args('year', { type: () => Int }) year: number
  ) {
    return this.kycAgencyService.findAgencyPayment(month, year, agencyCode);
  }

  // *********************** Verify Referral id ************************

  @Query(() => User)
  verifyReferralId(
    @Args('referralCode', { type: () => String }) referralCode: string
  ) {
    return this.kycAgencyService.findReferralDetails(referralCode);
  }

  // ********************* Remove KYC Agency **************************

  @Mutation(() => KycAgency)
  removeKycAgency(@Args('id', { type: () => Int }) id: number) {
    return this.kycAgencyService.remove(id);
  }

  // ********************* Star Of the Week ******************************
  @Query(() => KycAgency)
  starOfTheWeek() {
    return this.kycAgencyService.stow();
  }
}
