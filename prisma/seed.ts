import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany();
  // await prisma.post.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.create({
    data: {
      email: 'test1@gmail.com',
      name:'test1',
      father_or_husband_name:'father_test2',
      mobile_number:"1234567890",
      alternate_mobile_number:'1234644567890',
      date_of_birth:'01/01/2000',
      demat_account:'123436389202',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
      pw_id:'PW12345',
      membership: "BASIC",
      documents: {
        create: {
          title: 'Aadhar Card Front',
          url: 'https://www.prisma.io/day/',
        },
      },
    },
  });
  
  console.log({ user1 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
