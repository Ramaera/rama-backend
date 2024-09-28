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
import { title } from 'process';
const fs = require('fs');
const { parse } = require('csv-parse');


const SeedCommand = async () => {
  fs.createReadStream('prisma/HajipurShareAllotment.csv')
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', async function (row) {
try{

      const searchData= await prisma.user.findFirst({
        where:{
          pw_id:row[1].toUpperCase()
        }
      })

      if (searchData){
      await prisma.shareHoldingType.create({
        data:{
          InvestmentType:"HAJIPUR_PROJECT_SHARE",
          allotedShare:parseInt(row[3]),
          status:"TRANSFERRED",
          userPWId:row[1].toUpperCase(),
          userId:searchData?.id
        }
      })
    }else{
      console.log("Not Found",row[1])
    }
      // const commonUnderProcessData=await prisma.shareHoldingType.create({
      //   data:{
    
    
      //   }
      // })
    }catch(err){
console.log(err)
    }
    })
    .on('error', function (error) {
      console.log(error.message);
    })
    .on('end', function () {
      console.log('finished');
    });









  
    
  

    // Write CSV content to a file
    // fs.writeFile('allPaymentDetails.csv', csvContent, (err) => {
    //   if (err) {
    //     console.error('Error writing CSV file:', err);
    //   } else {
    //     console.log('CSV file has been saved successfully.');
    //   }
    // });
};

async function main() {
  const check = await SeedCommand();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
