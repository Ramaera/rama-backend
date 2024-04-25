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
import { STOW } from './entities/STOW.entity';
import { CreateSalesPerson } from './dto/create-salesPerson.input';
import { SalesPersonOutPut } from './entities/salesperson.entity';

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
  async findAgencyPaymentt(
    @Args('month', { type: () => Int }) month: number,
    @Args('agencyCode', { type: () => String }) agencyCode: string,
    @Args('year', { type: () => Int }) year: number
  ) {
    const data = await this.kycAgencyService.findAgencyPayment(
      month,
      year,
      agencyCode
    );
    return data;
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

  // @Query(() => KYCAGENYCPAYMENT)
  // getSelfPayment(
  //   @Args('month', { type: () => Int }) month: number,

  //   @Args('year', { type: () => Int }) year: number,
  //   @Args('agencyCode', { type: () => String }) agencyCode: string,
  //   @Args('project', { type: () => String }) project: string
  // ) {
  //   return this.kycAgencyService.getSelfAgencyPaymentDetails(
  //     month,
  //     year,
  //     agencyCode,
  //     project
  //   );
  // }

  // ********************* Star Of the Week ******************************
  @Query(() => [STOW])
  starOfTheWeek(
    @Args('startOfTheWeek', { type: () => String }) saturdayDate: string,
    @Args('EndOfTheWeek', { type: () => String }) nextFridayDate: string
  ) {
    return this.kycAgencyService.stow(saturdayDate, nextFridayDate);
  }
}
