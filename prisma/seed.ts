import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import csv from 'csv-parser';
import fs from 'fs';
// import { PasswordService } from 'src/auth/password.service';
import { PasswordService } from 'src/auth/password.service';
import { hash, compare } from 'bcrypt';
import moment from 'moment';

const HashedPassword = async (password) => {
  return await hash(password, 10);
};

// const SeedCommand = async () => {
//   const filePath =
//     '/Users/apple/Documents/ramaera_dashboard/rama-backend/prisma/data.csv';
//   const results = [];
//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on('data', (data) => results.push(data));
//   await prisma.$connect();
//   console.log('Seeding...');
//   for (const row of results) {
//     let encryptedPassword;
//     const timeZoneOffsetInMs =
//       new Date(row.CreatedDate).getTimezoneOffset() * 60000;
//     const iso8601Date = new Date(
//       new Date(row.CreatedDate).getTime() - timeZoneOffsetInMs
//     ).toISOString();
//     try {
//       const hashedPassword = await HashedPassword(row.DecrytedPass);
//       encryptedPassword = hashedPassword;
//     } catch (error) {
//       console.log(error);
//     }
//     console.log('---->>>>');
//     await prisma.user.create({
//       data: {
//         // Map the CSV columns to the corresponding Prisma model fields
//         password: encryptedPassword,
//         membership: row.KYC === 'Common' ? 'BASIC' : 'ADVANCE',
//         createdAt: iso8601Date,
//         pw_id: row.ReffCode,
//         rm_id: `RM-${(Math.random() + 1)
//           .toString(36)
//           .substring(7)
//           .toLocaleUpperCase()}`,
//         name: row.Name,
//         kyc: 'APPROVED',
//         date_of_birth: row.DOB,
//         father_or_husband_name: row.FatherName,
//         mobile_number: row.Mobile,
//         alternate_mobile_number: row.AltrMobile,
//         role: 'USER',
//         email: row.Email,
//         documents: {
//           create: [
//             {
//               title: 'avatar',
//               url: row.Photo === 'NULL' ? '' : row.Photo,
//               status: 'APPROVED',
//             },
//             {
//               title: 'aadhar_front',
//               url:
//                 row.Aadhar_Front_Copy === 'NULL' ? '' : row.Aadhar_Front_Copy,
//               status: 'APPROVED',
//             },
//             {
//               title: 'aadhar_back',
//               url: row.Aadhar_Back_Copy === 'NULL' ? '' : row.Aadhar_Back_Copy,
//               status: 'APPROVED',
//             },
//             {
//               title: 'pancard',
//               url: row.PAN_Copy === 'NULL' ? '' : row.PAN_Copy,
//               status: 'APPROVED',
//             },
//             {
//               title: 'voterid_front',
//               url: row.Voter_FrontCopy === 'NULL' ? '' : row.Voter_FrontCopy,
//               status: 'APPROVED',
//             },
//             {
//               title: 'voterid_back',
//               url: row.Voter_BackCopy === 'NULL' ? '' : row.Voter_BackCopy,
//               status: 'APPROVED',
//             },
//             {
//               title: 'passbook',
//               url: row.BankPassbook === 'NULL' ? '' : row.BankPassbook,
//               status: 'APPROVED',
//             },
//             {
//               title: 'payment_proof',
//               url: row.Payment_Proof === 'NULL' ? '' : row.Payment_Proof,
//               status: 'APPROVED',
//             },
//             {
//               title: 'nominee_aadhar_front',
//               url:
//                 row.NomneeAadhar_Front_Copy === 'NULL'
//                   ? ''
//                   : row.NomneeAadhar_Front_Copy,
//               status: 'APPROVED',
//             },
//             {
//               title: 'nominee_aadhar_back',
//               url:
//                 row.NomneeAadhar_Back_Copy === 'NULL'
//                   ? ''
//                   : row.NomneeAadhar_Back_Copy,
//               status: 'APPROVED',
//             },
//             {
//               title: 'demat_document',
//               url: row.DMATAttach === 'NULL' ? '' : row.DMATAttach,
//               status: 'APPROVED',
//             },
//             {
//               title: 'additional_payment_doc2',
//               url: row.Payment_Proof2 === 'NULL' ? '' : row.Payment_Proof2,
//               status: 'APPROVED',
//             },
//             {
//               title: 'additional_payment_doc3',
//               url: row.Payment_Proof3 === 'NULL' ? '' : row.Payment_Proof3,
//               status: 'APPROVED',
//             },
//           ],
//         },
//         nominee: {
//           create: {
//             name: row.Nomnee_Name,
//             relationship: row.Relationship,
//           },
//         },
//         demat_account: row.DematAc_No,
//       },
//     });
//   }
//   await prisma.$disconnect();
// };
async function main() {
  // await prisma.nominee.deleteMany();
  // await prisma.document.deleteMany();
  // await prisma.user.deleteMany();
  // SeedCommand();
  console.log('Seeding completed!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
