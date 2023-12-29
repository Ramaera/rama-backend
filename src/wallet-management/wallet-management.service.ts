import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWalletManagementInput } from './dto/create-wallet-management.input';
import { UpdateWalletManagementInput } from './dto/update-wallet-management.input';
import { WalletTransactionInput } from './dto/walletTransaction.input.dto';
import { PrismaService } from 'nestjs-prisma';
import { WalletBalance } from './entities/wallet-balance.entity';

@Injectable()
export class WalletManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async createWalletTransactionAndUpdateBalance(
    transactionInput: WalletTransactionInput
  ) {
    try {
      const checkAgencyCode = await this.prisma.kycAgency.findUnique({
        where: {
          agencyCode: transactionInput.agencyCode.toUpperCase(),
        },
      });

      if (!checkAgencyCode) {
        throw new ConflictException(`Agency Code Is Not Valid  `);
      }

      const totalBalance =
        await this.prisma.walletTransactionAndBalance.findFirst({
          where: {
            agencyCode: transactionInput.agencyCode,
          },
          orderBy: { id: 'desc' },
        });
      console.log(totalBalance);

      if (
        transactionInput.type === 'WITHDRAWL' &&
        totalBalance.finalBalance < transactionInput.amount
      ) {
        throw new ConflictException(`Insufficient Balance. `);
      }

      if (transactionInput.amount <= 0) {
        throw new ConflictException(`Amount should be greater Than 0 `);
      }

      const totalDetails = await this.prisma.walletTransactionAndBalance.create(
        {
          data: {
            amount: transactionInput.amount,
            agencyCode: transactionInput.agencyCode,
            type: transactionInput.type,
            metaData: transactionInput.metaData,
            finalBalance: totalBalance
              ? transactionInput.type === 'DEPOSIT'
                ? totalBalance.finalBalance + transactionInput.amount
                : totalBalance?.finalBalance - transactionInput.amount
              : transactionInput.amount,
          },
        }
      );

      return totalDetails;
    } catch (err) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  findAll() {
    return `This action returns all walletManagement`;
  }

  async findWalletBalance(agencyCode: string) {
    const finalBalance = this.prisma.walletTransactionAndBalance.findFirst({
      where: {
        agencyCode,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return finalBalance;
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
