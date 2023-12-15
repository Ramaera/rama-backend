import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWalletManagementInput } from './dto/create-wallet-management.input';
import { UpdateWalletManagementInput } from './dto/update-wallet-management.input';
import { WalletTransactionInput } from './dto/walletTransaction.input.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class WalletManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async createWalletTransactionAndUpdateBalance(
    transactionInput: WalletTransactionInput
  ) {
    try {
      const totalBalance =
        await this.prisma.walletTransactionAndBalance.findFirst({
          orderBy: { id: 'desc' },
        });

      if (transactionInput.amount <= 0) {
        throw new ConflictException(`Amount should be greater Than 0 `);
      }
      if (
        transactionInput.type === 'WITHDRAWL'
          ? totalBalance.finalBalance >= transactionInput.amount
          : totalBalance
      ) {
        var totalDetails;
        totalDetails = await this.prisma.walletTransactionAndBalance.create({
          data: {
            amount: transactionInput.amount,
            AgencyId: transactionInput.agencyId,
            type: transactionInput.type,
            metaData: transactionInput.metaData,
            finalBalance: totalBalance
              ? transactionInput.type === 'DEPOSIT'
                ? totalBalance.finalBalance + transactionInput.amount
                : totalBalance?.finalBalance - transactionInput.amount
              : transactionInput.amount,
          },
        });
      } else {
        throw new ConflictException(`Insufficient Balance. `);
        // throw new Error(
        //   'The requested withdrawal amount is greater than the available balance in the account'
        // );
      }

      return totalDetails;
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  findAll() {
    return `This action returns all walletManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} walletManagement`;
  }

  update(id: number, updateWalletManagementInput: UpdateWalletManagementInput) {
    return `This action updates a #${id} walletManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} walletManagement`;
  }
}
