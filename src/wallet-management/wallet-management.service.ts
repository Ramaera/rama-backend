import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWalletManagementInput } from './dto/create-wallet-management.input';
import { UpdateWalletManagementInput } from './dto/update-wallet-management.input';
import { WalletTransactionInput } from './dto/walletTransaction.input.dto';
import { PrismaService } from 'nestjs-prisma';
import { WalletBalance } from './entities/wallet-balance.entity';
import { UsersService } from 'src/users/users.service';
import { PrismaClient, WITHDRAW_STATUS } from '@prisma/client';
import { WithdraWalletMoney } from './dto/withdrawlRequest.input.dto';
import axios from 'axios';

@Injectable()
export class WalletManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async createWalletTransactionAndUpdateBalance(
    transactionInput: WalletTransactionInput
  ) {
    try {
      const data = await this.prisma.$transaction(async (tx) => {
        const checkAgencyCode = await tx.kycAgency.findUnique({
          where: {
            agencyCode: transactionInput.agencyCode.toUpperCase(),
          },
        });

        if (!checkAgencyCode) {
          throw new ConflictException(`Agency Code Is Not Valid  `);
        }

        const totalBalance = await tx.walletTransactionAndBalance.findFirst({
          where: {
            agencyCode: transactionInput.agencyCode,
          },
          orderBy: { id: 'desc' },
        });

        if (
          transactionInput.type === 'WITHDRAWL' &&
          totalBalance.finalBalance < transactionInput.amount
        ) {
          throw new ConflictException(`Insufficient Balance. `);
        }

        if (transactionInput.amount <= 0) {
          throw new ConflictException(`Amount should be greater Than 0 `);
        }

        const totalDetails = await tx.walletTransactionAndBalance.create({
          data: {
            amount: transactionInput.amount,
            agencyCode: transactionInput.agencyCode,
            type: transactionInput.type,
            metaData: transactionInput.metaData,
            category: transactionInput.category,
            finalBalance: totalBalance
              ? transactionInput.type === 'DEPOSIT'
                ? totalBalance.finalBalance + transactionInput.amount
                : totalBalance?.finalBalance - transactionInput.amount
              : transactionInput.amount,
          },
        });
        const metadataFromOutput = totalDetails.metaData;
        const dataFromMetaData = metadataFromOutput as { userId?: string }[];
        const userObject = dataFromMetaData.find((obj) =>
          obj.hasOwnProperty('userId')
        );
        const userIdValue = userObject ? userObject.userId : null;

        if (transactionInput.category === 'DEPOSIT_KYC') {
          await this.referralKycTransaction(
            tx,
            userIdValue,
            transactionInput.agencyCode,
            checkAgencyCode.id
          );
        }
        const documentDataFromMetaData = metadataFromOutput as {
          documentId?: string;
        }[];
        const documentObject = documentDataFromMetaData.find((obj) =>
          obj.hasOwnProperty('documentId')
        );
        const documentIdValue = documentObject
          ? documentObject.documentId
          : null;
        const OrderDataFromMetaData = metadataFromOutput as {
          orderId: string;
        }[];
        const OrderObject = OrderDataFromMetaData.find((obj) =>
          obj.hasOwnProperty('orderId')
        );
        const OrderIdValue = OrderObject ? OrderObject.orderId : null;

        if (transactionInput.category === 'DEPOSIT_PROJECT') {
          await this.referralProjectTransaction(
            tx,
            userIdValue,
            documentIdValue,
            transactionInput.agencyCode,
            checkAgencyCode.id
          );
        }

        if (transactionInput.category === 'DEPOSIT_PLANETSERA') {
          await this.planetseraOrderRewardTransaction(
            tx,
            userIdValue,
            OrderIdValue,
            transactionInput.agencyCode,
            checkAgencyCode.id
          );
        }

        return totalDetails;
      });
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async WithdrawlRequest(data: WithdraWalletMoney) {
    return this.prisma.withdrawlRequest.create({
      data: {
        amount: data.amount,
        agencyCode: data.agencyCode,
      },
    });
  }

  async agencyWithdrawlRequest(agencyCode: String) {
    return this.prisma.withdrawlRequest.findMany({
      where: { agencyCode },
    });
  }

  findAll() {
    return `This action returns all walletManagement`;
  }

  async referralKycTransaction(
    tx,
    userIdValue: string,
    agencyCode: string,
    agencyId: string
  ) {
    try {
      const check = await tx.referralKYCTransaction.findFirst({
        where: {
          userId: userIdValue,
        },
      });

      if (check) {
        throw new ConflictException(`Amount already Transferred To Wallet`);
      }
      await tx.referralKYCTransaction.create({
        data: {
          agencyCode: agencyCode,
          kycAgencyId: agencyId,
          userId: userIdValue,
          transferDate: new Date(),
          pwID: (await tx.user.findFirst({ where: { id: userIdValue } })).pw_id,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async referralProjectTransaction(
    tx,
    userIdValue: string,
    documentId: string,
    agencyCode: string,
    agencyId: string
  ) {
    try {
      const check = await tx.referralProjectTransaction.findFirst({
        where: {
          documentId,
        },
      });

      if (check) {
        throw new ConflictException(
          `Project Amount already Transferred To Wallet`
        );
      }
      await tx.referralProjectTransaction.create({
        data: {
          agencyCode: agencyCode,
          kycAgencyId: agencyId,
          userId: userIdValue,
          documentId: documentId,
          transferDate: new Date(),
          pwID: (await tx.user.findFirst({ where: { id: userIdValue } })).pw_id,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getOrderFromPlanetsera(id) {
    try {
      const response = await axios.get(
        `https://planetseraapi.planetsera.com/order/${id}`
      );

      console.log('Planetsera Order:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
  }

  async planetseraOrderRewardTransaction(
    tx,
    userId,
    orderId: string,
    agencyCode: string,
    agencyId: string
  ) {
    try {
      const check = await tx.getOrderFromPlanetsera(orderId);
      // if (check) {
      //   throw new ConflictException(
      //     `Project Amount already Transferred To Wallet`
      //   );
      // }
      // await tx.referralProjectTransaction.create({
      //   data: {
      //     agencyCode: agencyCode,
      //     kycAgencyId: agencyId,
      //     userId: userIdValue,
      //     documentId: documentId,
      //     transferDate: new Date(),
      //     pwID: (await tx.user.findFirst({ where: { id: userIdValue } })).pw_id,
      //   },
      // });
    } catch (err) {
      throw new Error(err.message);
    }
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

  async AgencyWalletHistory(agencyCode: string) {
    const history = this.prisma.walletTransactionAndBalance.findMany({
      where: {
        agencyCode,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return history;
  }

  async findreferralKycTransaction(userId: string) {
    return this.prisma.referralKYCTransaction.findUnique({
      where: {
        userId,
      },
    });
  }

  async findreferralProjectTransaction(documentId: string) {
    return this.prisma.referralProjectTransaction.findUnique({
      where: {
        documentId,
      },
    });
  }

  async updateWithdrawlRequestStatus(id: string, status: WITHDRAW_STATUS) {
    return this.prisma.withdrawlRequest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  update(id: number, updateWalletManagementInput: UpdateWalletManagementInput) {
    return `This action updates a #${id} walletManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} walletManagement`;
  }

  findAllKycReferral() {
    return this.prisma.referralKYCTransaction.findMany({});
  }

  findAllProjectReferral() {
    return this.prisma.referralProjectTransaction.findMany({});
  }
}
