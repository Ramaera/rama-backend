import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import csv from 'csv-parser';
import fs from 'fs';
// import { PasswordService } from 'src/auth/password.service';
import { PasswordService } from 'src/auth/password.service';
import { hash, compare } from 'bcrypt';
import moment from 'moment';
import cuid from 'cuid';

const HashedPassword = async (password) => {
  return await hash(password, 10);
};
const specificISOString = '2023-04-29T01:26:02.529Z';
const specificDate = new Date(specificISOString);

// const SeedCommand = async () => {
//   const filePath = '/Users/apple/Downloads/501to1000.csv';
//   const results = [];
//   fs.createReadStream(filePath)
//     .pipe(csv())
//     .on('data', (data) => results.push(data));

//   await prisma.$connect();
//   console.log('Seeding...');

// for (const row of results) {
//   const ExistingBatch = await prisma.bATCH.findFirst({
//     where: {
//       batchCode: parseInt(row.Filename),
//     },
//   });
//     // console.log('goingon....', row.row);
//     if (ExistingBatch) {
//       await prisma.rewardCode.create({
//         data: {
//           id: cuid(),
//           createdAt: specificDate,
//           updatedAt: specificDate,
//           code: row.Data,
//           isClaimed: false,
//           batchCodeId: parseInt(row.Filename),
//         },
//       });
//     } else {
//       await prisma.bATCH.create({
//         data: {
//           batchCode: parseInt(row.Filename),
//           createdAt: specificDate,
//           updatedAt: specificDate,
//           rewardCode: {
//             create: {
//               code: row.Data,
//             },
//           },
//         },
//       });
//     }
//   }
// };

const SeedCommand = async () => {
  const filePath =
    '/Users/apple/Documents/ramaera_dashboard/rama-backend/prisma/AgraMart Project KYC Users(20-24Aug).csv';
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data));
  await prisma.$connect();
  console.log('Seeding...');

  for (const row of results) {
    // const encryptedPassword = await HashedPassword(row.Acc_Password);

    // var dateString = row.CreatedDate;
    // var dateParts = dateString.split(/\/| |-|:/); // Split using /, space, or :

    // var year = parseInt(dateParts[0]);

    // var month = parseInt(dateParts[1]) - 1; // Months in JavaScript are 0-indexed
    // var day = parseInt(dateParts[2]);
    // var hours = parseInt(dateParts[3]);
    // var minutes = parseInt(dateParts[4]);

    // var dateCreated = new Date(year, month, day, hours, minutes);

    // await prisma.user.upsert({
    //   where: {
    //     pw_id: row.ReffCode,
    //   },
    //   create: {
    //     membership: row.KYC === 'Basic' ? 'BASIC' : 'ADVANCE',
    //     password: encryptedPassword,
    //     createdAt: dateCreated,
    //     pw_id: row.ReffCode,
    //     rm_id: `RM-${(Math.random() + 1)
    //       .toString(36)
    //       .substring(7)
    //       .toLocaleUpperCase()}`,
    //     name: row.Name,
    //     demat_account: row.DematAc_No,
    //     kyc: row.KYCStatus,
    //     date_of_birth: row.DOB,
    //     father_or_husband_name: row.FatherName,
    //     mobile_number: row.Mobile,
    //     alternate_mobile_number: row.AltrMobile,
    //     role: 'USER',
    //     referralAgencyCode: row.SupporterID.toLocaleUpperCase(),
    //     email: row.Email,
    //     documents: {
    //       create: [
    //         {
    //           title: 'avatar',
    //           url: row.Photo === 'NULL' ? '' : row.Photo,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'aadhar_front',
    //           url:
    //             row.Aadhar_Front_Copy === 'NULL' ? '' : row.Aadhar_Front_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'aadhar_back',
    //           url: row.Aadhar_Back_Copy === 'NULL' ? '' : row.Aadhar_Back_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'pancard',
    //           url: row.PAN_Copy === 'NULL' ? '' : row.PAN_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'voterid_front',
    //           url: row.Voter_FrontCopy === 'NULL' ? '' : row.Voter_FrontCopy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'voterid_back',
    //           url: row.Voter_BackCopy === 'NULL' ? '' : row.Voter_BackCopy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'passbook',
    //           url: row.BankPassbook === 'NULL' ? '' : row.BankPassbook,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'payment_proof',
    //           url: row.Payment_Proof === 'NULL' ? '' : row.Payment_Proof,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'nominee_aadhar_front',
    //           url:
    //             row.NomneeAadhar_Front_Copy === 'NULL'
    //               ? ''
    //               : row.NomneeAadhar_Front_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'nominee_aadhar_back',
    //           url:
    //             row.NomneeAadhar_Back_Copy === 'NULL'
    //               ? ''
    //               : row.NomneeAadhar_Back_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'demat_document',
    //           url: row.DMATAttach === 'NULL' ? '' : row.DMATAttach,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'additional_payment_doc2',
    //           url: row.Payment_Proof2 === 'NULL' ? '' : row.Payment_Proof2,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'additional_payment_doc3',
    //           url: row.Payment_Proof3 === 'NULL' ? '' : row.Payment_Proof3,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //       ],
    //     },
    //     nominee: {
    //       create: { name: row.Nomnee_Name, relationship: row.Relationship },
    //     },
    //   },
    //   update: {
    //     membership: row.KYC === 'Basic' ? 'BASIC' : 'ADVANCE',
    //     name: row.Name,
    //     demat_account: row.DematAc_No,
    //     kyc: row.KYCStatus,
    //     date_of_birth: row.DOB,
    //     father_or_husband_name: row.FatherName,
    //     mobile_number: row.Mobile,
    //     alternate_mobile_number: row.AltrMobile,
    //     role: 'USER',
    //     referralAgencyCode: row.SupporterID,
    //     email: row.Email,
    //     nominee: {
    //       update: { name: row.Nomnee_Name, relationship: row.Relationship },
    //     },
    //   },
    // });

    // let encryptedPassword;
    // const timeZoneOffsetInMs =
    //   new Date(row.CreatedDate).getTimezoneOffset() * 60000;
    // var x = new Date(row.CreatedDate);
    // console.log('row.createdDate', row.CreatedDate);

    // var dateString = row.CreatedDate;
    // var dateParts = dateString.split(/\/| |-|:/); // Split using /, space, or :

    // var year = parseInt(dateParts[0]);

    // var month = parseInt(dateParts[1]) - 1; // Months in JavaScript are 0-indexed
    // var day = parseInt(dateParts[2]);
    // var hours = parseInt(dateParts[3]);
    // var minutes = parseInt(dateParts[4]);
    // // console.log('-->>', dateParts);

    // // console.log('1,', day, '2', month, '3', year, '4', hours, '5', minutes);

    // var dateCreated = new Date(year, month, day, hours, minutes);
    // console.log(dateCreated);
    // try {
    //   const hashedPassword = await HashedPassword(row.Acc_Password);
    //   encryptedPassword = hashedPassword;
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log('---->>>>', row.row, row.ReffCode);

    // await prisma.user.create({
    //   data: {
    //     membership: row.KYC === 'Basic' ? 'BASIC' : 'ADVANCE',
    //     password: encryptedPassword,
    //     createdAt: dateCreated,
    //     pw_id: row.ReffCode,
    //     rm_id: `RM-${(Math.random() + 1)
    //       .toString(36)
    //       .substring(7)
    //       .toLocaleUpperCase()}`,
    //     name: row.Name,
    //     kyc: row.KYCStatus,
    //     date_of_birth: row.DOB,
    //     father_or_husband_name: row.FatherName,
    //     mobile_number: row.Mobile,
    //     alternate_mobile_number: row.AltrMobile,
    //     role: 'USER',
    //     referralAgencyCode: row.SupporterID,
    //     email: row.Email,
    //     documents: {
    //       create: [
    //         {
    //           title: 'avatar',
    //           url: row.Photo === 'NULL' ? '' : row.Photo,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'aadhar_front',
    //           url:
    //             row.Aadhar_Front_Copy === 'NULL' ? '' : row.Aadhar_Front_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'aadhar_back',
    //           url: row.Aadhar_Back_Copy === 'NULL' ? '' : row.Aadhar_Back_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'pancard',
    //           url: row.PAN_Copy === 'NULL' ? '' : row.PAN_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'voterid_front',
    //           url: row.Voter_FrontCopy === 'NULL' ? '' : row.Voter_FrontCopy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'voterid_back',
    //           url: row.Voter_BackCopy === 'NULL' ? '' : row.Voter_BackCopy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'passbook',
    //           url: row.BankPassbook === 'NULL' ? '' : row.BankPassbook,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'payment_proof',
    //           url: row.Payment_Proof === 'NULL' ? '' : row.Payment_Proof,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'nominee_aadhar_front',
    //           url:
    //             row.NomneeAadhar_Front_Copy === 'NULL'
    //               ? ''
    //               : row.NomneeAadhar_Front_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'nominee_aadhar_back',
    //           url:
    //             row.NomneeAadhar_Back_Copy === 'NULL'
    //               ? ''
    //               : row.NomneeAadhar_Back_Copy,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'demat_document',
    //           url: row.DMATAttach === 'NULL' ? '' : row.DMATAttach,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'additional_payment_doc2',
    //           url: row.Payment_Proof2 === 'NULL' ? '' : row.Payment_Proof2,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //         {
    //           title: 'additional_payment_doc3',
    //           url: row.Payment_Proof3 === 'NULL' ? '' : row.Payment_Proof3,
    //           status:
    //             row.KYCStatus === 'APPROVED'
    //               ? 'APPROVED'
    //               : row.KYCStatus === 'REJECTED'
    //               ? 'REJECTED'
    //               : 'PENDING',
    //         },
    //       ],
    //     },
    //     nominee: {
    //       create: {
    //         name: row.Nomnee_Name,
    //         relationship: row.Relationship,
    //       },
    //     },
    //     demat_account: row.DematAc_No,
    //   },
    // });

    // ************* KYC Agency Data **********************

    // const agencyUser = await prisma.user.findFirst({
    //   where: {
    //     pw_id: row.PWID,
    //   },
    // });
    // console.log('--', agencyUser.id, agencyUser.pw_id, agencyUser.name);

    // await prisma.user.update({
    //   where: {
    //     id: agencyUser.id,
    //   },
    //   data: {
    //     role: 'AGENT',
    //     isKycAgent: true,
    //   },
    // });

    // await prisma.kycAgency.create({
    //   data: {
    //     agencyCode: row.AgencyCode,
    //     userId: agencyUser.id,
    //     createdAt: dateCreated,
    //     licenseValidityInYear:
    //       row.Agency_Option === 'Rs.5000/- Annual Fee' ? 1 : 5,
    //   },
    // });

    // **************** Agra  Project Data **********************

    const user = await prisma.user.findFirst({
      where: {
        pw_id: row.ReffCode.toLocaleUpperCase(),
      },
    });
    // console.log('0000', user.id, user.name);
    await prisma.document.create({
      data: {
        userId: user.id,
        title: 'agra_project_payment',
        url: row.Slip,
        amount: parseInt(row.Enroll_Amount),
        status: 'PENDING',
        utrNo: row.Enroll_UTRNo,
      },
    });

    // **************** Hajipur  Project Data **********************
    // await prisma.document.createMany({
    //   data: [
    //     {
    //       userId: user.id,
    //       title: 'hajipur_project_payment',
    //       url: row.Slip1,
    //       amount: parseInt(row.Enroll_Amount1),
    //       status:
    //         row.Slip1_Status === 'Approved'
    //           ? 'APPROVED'
    //           : row.Slip1_Status === 'Rejected'
    //           ? 'REJECTED'
    //           : 'PENDING',
    //     },
    //     {
    //       userId: user.id,
    //       title: 'hajipur_project_payment_1',
    //       url: row.slip2,
    //       amount: parseInt(row.Enroll_Amount2),
    //       status:
    //         row.Slip2_Status === 'Approved'
    //           ? 'APPROVED'
    //           : row.Slip2_Status === 'Rejected'
    //           ? 'REJECTED'
    //           : 'PENDING',
    //     },
    //     {
    //       userId: user.id,
    //       title: 'hajipur_project_payment_2',
    //       url: row.slip3,
    //       amount: parseInt(row.Enroll_Amount3),
    //       status:
    //         row.Slip3_Status === 'Approved'
    //           ? 'APPROVED'
    //           : row.Slip3_Status === 'Rejected'
    //           ? 'REJECTED'
    //           : 'PENDING',
    //     },
    //   ],
    // });
  }
  await prisma.$disconnect();
};
async function main() {
  // await prisma.kycAgency.deleteMany();
  // await prisma.nominee.deleteMany();
  // await prisma.document.deleteMany();
  // await prisma.user.deleteMany();
  // await SeedCommand();
  const check = await HashedPassword('garmej1976');
  // console.log('------>>', cuid());
  console.log('------>>Password', check);
  // console.log(
  //   'RMID',
  //   `RM-${(Math.random() + 1).toString(36).substring(7).toLocaleUpperCase()}`
  // );

  console.log('Seeding completed!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
