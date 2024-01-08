import { PrismaClient, Role } from '@prisma/client';
import { User } from '@prisma/client';
const prisma = new PrismaClient();
import csv from 'papaparse';
import fs from 'fs';
// import { PasswordService } from 'src/auth/password.service';
import { PasswordService } from 'src/auth/password.service';
import { hash, compare } from 'bcrypt';
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

function getSaturdayAndPreviousFriday() {
  const currentDate = new Date();

  // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayOfWeek = currentDate.getDay();

  // Calculate the difference between the current day and Saturday
  const daysUntilSaturday = 6 - currentDayOfWeek;

  // Calculate the date of the most recent Saturday
  const saturdayDate = new Date(currentDate);
  saturdayDate.setDate(currentDate.getDate() + daysUntilSaturday);
  saturdayDate.setUTCHours(0, 0, 0, 0);

  // Calculate the date of the previous week's Friday
  const previousFridayDate = new Date(saturdayDate);
  previousFridayDate.setDate(saturdayDate.getDate() - 6);
  previousFridayDate.setUTCHours(23, 59, 59, 999);

  return {
    mostRecentSaturday: saturdayDate.toISOString(),
    previousWeekFriday: previousFridayDate.toISOString(),
  };
}

// Example usage:
// const { mostRecentSaturday, previousWeekFriday } =
//   getSaturdayAndPreviousFriday();
// console.log('Most recent Saturday:', mostRecentSaturday);
// console.log("Previous week's Friday:", previousWeekFriday);

// const SeedCommand = async () => {
//   // Example usage:

//   const doc = await prisma.document.findMany({
//     where: {
//       title: {
//         contains: 'agra',
//       },
//       approvalDocumentDate: {
//         gte: '2023-10-01T00:00:00.000Z',
//         lte: '2023-10-31T00:00:00.000Z',
//       },
//       user: {
//         kyc: 'APPROVED',
//       },
//     },

//     include: {
//       user: true,
//     },
//   });

//   doc.map((data) =>
//     console.log(data.user.pw_id, data.user.kyc, data.title, data.approvalDate)
//   );

//   // const users = await prisma.user.findMany({
//   //   where: {
//   //     createdAt: {
//   //       gte: '2023-10-01T00:00:00.000Z',
//   //     },
//   //     referralAgencyCode: {
//   //       contains: 'RLI',
//   //     },
//   //   },
//   // });
//   // users.map((user) =>
//   //   console.log(user.pw_id, user.referralAgencyCode, user.kyc, user.createdAt)
//   // );
//   // const users = await prisma.user.findMany({
//   //   where: {
//   //     OR: [
//   //       {
//   //         documents: {
//   //           some: {
//   //             title: { contains: 'demat_document' },
//   //             status: 'APPROVED',
//   //             approvalDocumentDate: {
//   //               gte: '2023-10-01T00:00:00.00Z',
//   //             },
//   //           },
//   //         },
//   //       },
//   //       {
//   //         documents: {
//   //           some: {
//   //             title: { contains: 'demat_document' },
//   //             status: 'APPROVED',
//   //             createdAt: {
//   //               gte: '2023-10-01T00:00:00.00Z',
//   //             },
//   //           },
//   //         },
//   //       },
//   //     ],
//   //   },
//   //   include: {
//   //     documents: true,
//   //   },
//   // });
//   // const documents = await prisma.document.findMany({
//   //   where: {
//   //     OR: [
//   //       {
//   //         title: { contains: 'demat_document' },
//   //         status: 'APPROVED',
//   //         approvalDocumentDate: {
//   //           gte: '2023-10-01T00:00:00.00Z',
//   //         },
//   //       },
//   //       {
//   //         title: { contains: 'demat_document' },
//   //         status: 'APPROVED',
//   //         createdAt: {
//   //           gte: '2023-10-01T00:00:00.00Z',
//   //         },
//   //       },
//   //     ],
//   //   },
//   //   include: {
//   //     user: true,
//   //   },
//   // });
//   // documents.map((doc) =>
//   //   console.log(
//   //     doc.user.pw_id,
//   //     doc.user.membership,
//   //     doc.user.referralAgencyCode,
//   //     doc.title,
//   //     doc.createdAt,
//   //     doc.approvalDocumentDate
//   //   )
//   // );
//   // users.map((user) => console.log(user.pw_id, user.referralAgencyCode));
// };

async function main() {
  const result = await prisma.$queryRaw<User[]>`SELECT * FROM User`;

  console.log(result);
  // const check = await SeedCommand();/
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
