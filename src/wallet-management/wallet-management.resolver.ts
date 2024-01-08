import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WalletManagementService } from './wallet-management.service';
import { Wallet } from './entities/wallet-management.entity';
import { WalletTransactionInput } from './dto/walletTransaction.input.dto';
import { WalletBalance } from './entities/wallet-balance.entity';
import { KYCREFERRAL } from './entities/kyc-referral.entity';

@Resolver(() => Wallet)
export class WalletManagementResolver {
  constructor(private readonly walletService: WalletManagementService) {}

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

  @Query(() => KYCREFERRAL, { name: 'findreferralKycTransaction' })
  findReferralKyc(@Args('userId', { type: () => String }) userId: string) {
    return this.walletService.findreferralKycTransaction(userId);
  }

  @Query(() => KYCREFERRAL, { name: 'findreferralProjectTransaction' })
  findReferralProjects(
    @Args('userId', { type: () => String }) documentId: string
  ) {
    return this.walletService.findreferralProjectTransaction(documentId);
  }

  @Query(() => WalletBalance, { name: 'GetFinalWalletBalanceOfAgency' })
  findOne(@Args('agencyCode', { type: () => String }) agencyCode: string) {
    return this.walletService.findWalletBalance(agencyCode);
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
