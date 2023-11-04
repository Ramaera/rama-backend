import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();
import csv from 'papaparse';
import fs from 'fs';
// import { PasswordService } from 'src/auth/password.service';
import { PasswordService } from 'src/auth/password.service';
import { hash, compare } from 'bcrypt';
import moment from 'moment';
import cuid from 'cuid';
import { KycAgency } from 'src/kyc-agency/entities/kyc-agency.entity';
import { createObjectCsvWriter } from 'csv-writer';
import { isNull } from 'util';
import { isEmpty } from 'class-validator';
import { isNullableType } from 'graphql';

function getMonthDates(monthNumber) {
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Calculate the first day of the specified month
  const startDate = new Date(
    Date.UTC(currentYear, monthNumber - 1, 1, 0, 0, 0)
  );

  // Calculate the last day of the month by going to the first day of the next month and subtracting one day
  const nextMonth = (monthNumber % 12) + 1;
  const nextYear = nextMonth === 1 ? currentYear + 1 : currentYear;
  const endDate = new Date(Date.UTC(nextYear, nextMonth - 1, 1, 0, 0, 0) - 1);

  return {
    startDate, // Leave it as a Date object
    endDate, // Get endDate in YYYY-MM-DD format
  };
}

const SeedCommand = async () => {
  // const userDetails = await prisma.user.findMany({});
  // userDetails.map(async (user) => {
  //   const Referralid = await user.referralAgencyCode;
  //   if (Referralid != 'NULL' && Referralid?.toUpperCase().includes('PW')) {
  //     const checkReferralAgency = await prisma.user.findFirst({
  //       where: {
  //         pw_id: {
  //           equals: Referralid,
  //           mode: 'insensitive',
  //         },
  //       },
  //       include: {
  //         KycAgency: true,
  //       },
  //     });
  //     // console.log(Referralid, 'Referralid');
  //     // console.log(checkReferralAgency);
  //     // console.log(
  //     //   'checkReferralAgency.isKycAgent',
  //     //   checkReferralAgency.isKycAgent
  //     // );

  //     if (checkReferralAgency === null) {
  //       console.log('agency Code', Referralid, 'user pwid', user.pw_id);
  //     }

  //     // if (
  //     //   checkReferralAgency.isKycAgent &&
  //     //   checkReferralAgency.KycAgency.agencyCode
  //     // ) {
  //     //   const UpdateReferralCode = await prisma.user.update({
  //     //     where: {
  //     //       id: user.id,
  //     //     },
  //     //     data: {
  //     //       referralAgencyCode: checkReferralAgency.KycAgency.agencyCode,
  //     //     },
  //     //   });
  //     // }
  //   }
  // });

  const userDocuments = await prisma.document.findMany({
    where: {
      approvalDate: {
        not: {
          equals: null,
        },
      },
    },
  });

  userDocuments.map(
    async (date) =>
      await prisma.document.update({
        where: {
          id: date.id,
        },
        data: {
          approvalDocumentDate: new Date(date.approvalDate),
        },
      })
  );
};

async function main() {
  const check = await SeedCommand();

  console.log('Seeding completed!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
