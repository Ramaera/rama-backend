import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WalletManagementService } from './wallet-management.service';
import { Wallet } from './entities/wallet-management.entity';
import { WalletTransactionInput } from './dto/walletTransaction.input.dto';
import { WalletBalance } from './entities/wallet-balance.entity';
import { KYCREFERRAL } from './entities/kyc-referral.entity';
import { PROJECTREFERRAL } from './entities/project-referral.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => Wallet)
export class WalletManagementResolver {
  constructor(private readonly walletService: WalletManagementService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Wallet)
  async TransactionToWallet(
    @Args('transactionToWallet') transactionInput: WalletTransactionInput
  ) {
    const data =
      await this.walletService.createWalletTransactionAndUpdateBalance(
        transactionInput
      );

    return data;
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => KYCREFERRAL, { name: 'findreferralKycTransaction' })
  findReferralKyc(@Args('userId', { type: () => String }) userId: string) {
    return this.walletService.findreferralKycTransaction(userId);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => KYCREFERRAL, { name: 'findreferralProjectTransaction' })
  findReferralProjects(
    @Args('documentId', { type: () => String }) documentId: string
  ) {
    return this.walletService.findreferralProjectTransaction(documentId);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => WalletBalance, { name: 'GetFinalWalletBalanceOfAgency' })
  findOne(@Args('agencyCode', { type: () => String }) agencyCode: string) {
    return this.walletService.findWalletBalance(agencyCode);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [Wallet], { name: 'AgencyWalletHistory' })
  findAll(@Args('agencyCode', { type: () => String }) agencyCode: string) {
    return this.walletService.AgencyWalletHistory(agencyCode);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [KYCREFERRAL], { name: 'getAllKycReferral' })
  findAllKycReferral() {
    return this.walletService.findAllKycReferral();
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [PROJECTREFERRAL], { name: 'getAllProjectReferral' })
  findAllProjectReferral() {
    return this.walletService.findAllProjectReferral();
  }

  // @Mutation(() => WalletManagement)
  // updateWalletManagement(@Args('updateWalletManagementInput') updateWalletManagementInput: UpdateWalletManagementInput) {
  //   return this.walletManagementService.update(updateWalletManagementInput.id, updateWalletManagementInput);
  // }

  // @Mutation(() => WalletManagement)
  // removeWalletManagement(@Args('id', { type: () => Int }) id: number) {
  //   return this.walletManagementService.remove(id);
  // }
}
