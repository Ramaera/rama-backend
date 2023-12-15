import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WalletManagementService } from './wallet-management.service';
import { Wallet } from './entities/wallet-management.entity';
import { WalletTransactionInput } from './dto/walletTransaction.input.dto';

@Resolver(() => Wallet)
export class WalletManagementResolver {
  constructor(private readonly walletService: WalletManagementService) {}

  @Mutation(() => Wallet)
  async depositAmountToWallet(
    @Args('transactionToWallet') transactionInput: WalletTransactionInput
  ) {
    const data =
      await this.walletService.createWalletTransactionAndUpdateBalance(
        transactionInput
      );

    return data;
  }

  // @Query(() => [WalletManagement], { name: 'walletManagement' })
  // findAll() {
  //   return this.walletManagementService.findAll();
  // }

  // @Query(() => WalletManagement, { name: 'walletManagement' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.walletManagementService.findOne(id);
  // }

  // @Mutation(() => WalletManagement)
  // updateWalletManagement(@Args('updateWalletManagementInput') updateWalletManagementInput: UpdateWalletManagementInput) {
  //   return this.walletManagementService.update(updateWalletManagementInput.id, updateWalletManagementInput);
  // }

  // @Mutation(() => WalletManagement)
  // removeWalletManagement(@Args('id', { type: () => Int }) id: number) {
  //   return this.walletManagementService.remove(id);
  // }
}
