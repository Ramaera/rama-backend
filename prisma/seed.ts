import { PrismaClient, Role } from '@prisma/client';
import { User } from '@prisma/client';
const prisma = new PrismaClient();

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
const fs = require('fs');
const { parse } = require('csv-parse');
const SeedCommand = async () => {
  fs.createReadStream('prisma/AGREEMENT_DATA.csv')
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', async function (row) {
      try {
        await prisma.aGREEMENT_DATA.create({
          data: {
            pwId: row[1],
            agreementFieldData: {
              '1': row[2],
              '2': row[3],
              '3': row[4],
              '4': row[5],
              '5': row[6],
              '6': row[7],
              '7': row[8],
              '8': row[9],
              '9': row[10],
              '10': row[11],
              '11': row[12],
              '12': row[13],
              '13': row[14],
              '14': row[15],
              '15': row[16],
              '16': row[17],
              '17': row[18],
            },
            agreementUrl: null, // Assuming agreementUrl is not provided in the CSV
            isCompleted: false,
          },
        });
      } catch (err) {
        console.log('err', err);
      }
    })
    .on('error', function (error) {
      console.log(error.message);
    })
    .on('end', function () {
      console.log('finished');
    });
};

async function main() {
  const check = await SeedCommand();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
