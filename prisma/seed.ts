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

// function getSaturdayAndPreviousFriday() {
//   const currentDate = new Date();

//   // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
//   const currentDayOfWeek = currentDate.getDay();

//   // Calculate the difference between the current day and Saturday
//   const daysUntilSaturday = 6 - currentDayOfWeek;

//   // Calculate the date of the most recent Saturday
//   const saturdayDate = new Date(currentDate);
//   saturdayDate.setDate(currentDate.getDate() + daysUntilSaturday);
//   saturdayDate.setUTCHours(0, 0, 0, 0);

//   // Calculate the date of the previous week's Friday
//   const previousFridayDate = new Date(saturdayDate);
//   previousFridayDate.setDate(saturdayDate.getDate() - 6);
//   previousFridayDate.setUTCHours(23, 59, 59, 999);

//   return {
//     mostRecentSaturday: saturdayDate.toISOString(),
//     previousWeekFriday: previousFridayDate.toISOString(),
//   };
// }

// Example usage:
// const { mostRecentSaturday, previousWeekFriday } =
//   getSaturdayAndPreviousFriday();
// console.log('Most recent Saturday:', mostRecentSaturday);
// console.log("Previous week's Friday:", previousWeekFriday);

// const SeedCommand = async () => {
//   // const UserProjectData = await prisma.user.findMany({
//   //   where: {
//   //     documents: {
//   //       some: {
//   //         title: {
//   //           contains: 'demat',
//   //         },
//   //         approvalDocumentDate: {
//   //           gte: '2023-12-01T00:00:00.000Z',
//   //           lte: '2023-12-31T11:59:59.999Z',
//   //         },
//   //       },
//   //     },
//   //   },
//   //   include: {
//   //     documents: true,
//   //   },
//   // });
//   // UserProjectData.map((userData) =>
//   //   console.log(userData.pw_id, userData.referralAgencyCode, userData.createdAt,userData.)
//   // );
//   // const ProjectData = await prisma.document.findMany({
//   //   where: {
//   //     approvalDocumentDate: {
//   //       gte: '2023-12-01T00:00:00.000Z',
//   //       lte: '2023-12-31T11:59:59.999Z',
//   //     },
//   //     title: {
//   //       contains: 'demat',
//   //     },
//   //     user: {
//   //       kyc: 'APPROVED',
//   //     },
//   //   },
//   //   include: {
//   //     user: true,
//   //   },
//   //   orderBy: {
//   //     approvalDocumentDate: 'asc',
//   //   },
//   // });
//   // ProjectData.map((doc) =>
//   //   console.log(
//   //     doc.user.pw_id,
//   //     doc.user.createdAt,
//   //     doc.user.kyc,
//   //     doc.user.referralAgencyCode,
//   //     doc.title,
//   //     doc.approvalDocumentDate
//   //   )
//   // );
// };

const SeedCommand = async () => {
  const documents = await prisma.document.findMany({
    where: {
      title: {
        contains: 'payment',
      },
      user: {
        referralAgencyCode: {
          contains: 'RLI',
        },
      },
    },
    include: {
      user: true,
    },
    orderBy: [
      {
        title: 'desc',
      },
    ],
  });
  documents.map(
    async (doc) => (
      console.log(doc.title, doc.user.pw_id),
      await prisma.document.update({
        where: {
          id: doc.id,
        },
        data: {
          referralAgencyCode: doc.user.referralAgencyCode,
        },
      })
    )
  );

  // const documents = await prisma.document.findMany({
  //   where: {
  //     title: {
  //       contains: 'agra',
  //     },
  //     status: 'REJECTED',
  //   },
  //   include: {
  //     user: true,
  //   },
  // });

  // documents.map((data) =>
  //   console.log(data.title, data.amount, data.user.pw_id)
  // );

  // const documentsWithSameTitleAndUserId = await prisma.document.findMany({
  //   where: {
  //     title: 'demat_document',
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     userId: true,
  //   },
  // });

  // Filter out documents with duplicate user IDs
  // const duplicates = documentsWithSameTitleAndUserId.filter(
  //   (document, index, self) =>
  //     index !== self.findIndex((d) => d.userId === document.userId)
  // );
  // console.log('-->', duplicates);
  // console.log(documentsWithSameTitleAndUserId);

  // const usersWithApprovedDematDocuments = await prisma.user.findMany({
  //   where: {
  //     referralAgencyCode: 'RLI467186',
  //     documents: {
  //       some: {
  //         title: {
  //           contains: 'demat',
  //         },
  //         status: 'APPROVED',
  //       },
  //     },
  //   },
  //   select: {
  //     id: true,
  //     pw_id: true,
  //     documents: {
  //       select: {
  //         title: true,
  //         amount: true,
  //         status: true,
  //       },
  //       where: {
  //         title: {
  //           contains: 'demat',
  //         },
  //         status: 'APPROVED',
  //       },
  //     },
  //   },
  // });

  // The result will contain the desired information about users and their associated documents.

  // ))
  // const finalData = await prisma.document.findMany({
  //   where: {
  //     user: {
  //       pw_id: USERPWID,
  //     },
  //   },
  // });

  // finalData.map((check) =>
  //   console.log(check.title, check.amount, check.createdAt, check.status)
  // );

  // console.log(usersWithApprovedDematDocuments);
};

async function main() {
  const check = await SeedCommand();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
