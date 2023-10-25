import { Injectable } from '@nestjs/common';
import {
  CreateProjectEnrolledInput,
  projectDataInput,
} from './dto/create-project-enrolled.input';
import { UpdateProjectEnrolledInput } from './dto/update-project-enrolled.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProjectEnrolledService {
  constructor(private prisma: PrismaService) {}

  async create() {
    const upcomingEntries = await this.prisma.user.findMany({
      where: {
        documents: {
          some: {
            title: {
              startsWith: 'hajipur_project_payment',
            },
            status: 'APPROVED',
          },
        },
        kyc: 'APPROVED',
      },
      include: {
        documents: true,
      },
    });

    // Filter and calculate total payment for upcoming entries
    const upcomingPayments = upcomingEntries.map(async (user) => {
      const userDocuments = user.documents.filter(
        (document) =>
          document.title.startsWith('hajipur_project_payment') &&
          document.status === 'APPROVED'
      );

      const totalPayment = userDocuments.reduce((acc, document) => {
        const paymentAmount = document.amount || 0;
        return acc + paymentAmount;
      }, 0);
      if (totalPayment > 0) {
        // Create the projectEnrolledStatus record for each user

        const projectEnrolled = await this.prisma.projectEnrolledStatus.create({
          data: {
            projectName: 'Hajipur_Spice_Project',
            projectStatus: 'ENROLLED',
            userId: user.id,
            totalInvestedAmountinProject: totalPayment.toString(),
          },
        });

        // console.log('User ID:', user.id, 'Total Payment:', totalPayment);
      }
    });
    return 'This';
  }

  // **************** Live Query For Project Enrollement ******* F

  async createlive(data: projectDataInput) {
    const searchUser = await this.prisma.user.findFirst({
      where: {
        id: data.userId,
      },
      include: {
        documents: true,
      },
    });
    const userDocuments = searchUser.documents.filter(
      (document) =>
        document.title.startsWith(data.project_payment_name) &&
        document.status === 'APPROVED'
    );

    const totalPayment = userDocuments.reduce((acc, document) => {
      const paymentAmount = document.amount || 0;
      return acc + paymentAmount;
    }, 0);

    // Fetch the existing projectEnrolledStatus record for the same project if it exists
    const existingProjectEnrolled =
      await this.prisma.projectEnrolledStatus.findFirst({
        where: {
          userId: searchUser.id,
          projectName:
            data.project_payment_name === 'hajipur_project_payment'
              ? 'Hajipur_Spice_Project'
              : data.project_payment_name === 'agra_project_payment'
              ? 'Agra_Mart_Project'
              : 'Not in Project',
        },
      });
    if (existingProjectEnrolled) {
      // Compare the existing totalInvestedAmountinProject with the current totalPayment
      if (
        existingProjectEnrolled.totalInvestedAmountinProject !==
        totalPayment.toString()
      ) {
        // Update the existing record if the totalPayment has changed
        console.log('About to update Status');
        await this.prisma.projectEnrolledStatus.update({
          where: { id: existingProjectEnrolled.id },
          data: {
            totalInvestedAmountinProject: totalPayment.toString(),
          },
        });
      }
      // If totalPayment hasn't changed, do nothing
      console.log('already existed');
    } else {
      // Create the projectEnrolledStatus record if it doesn't exist
      console.log('About to create Status');
      await this.prisma.projectEnrolledStatus.create({
        data: {
          projectName:
            data.project_payment_name === 'hajipur_project_payment'
              ? 'Hajipur_Spice_Project'
              : data.project_payment_name === 'agra_project_payment'
              ? 'Agra_Mart_Project'
              : 'Not in Project',
          projectStatus: 'ENROLLED',
          userId: searchUser.id,
          totalInvestedAmountinProject: totalPayment.toString(),
        },
      });
    }

    // if (totalPayment > 0) {
    //   // Create the projectEnrolledStatus record for each user
    //   console.log('About to create Status');
    //   const projectEnrolled = await this.prisma.projectEnrolledStatus.create({
    //     data: {
    //       projectName:
    //         data.project_payment_name === 'hajipur_project_payment'
    //           ? 'Hajipur_Spice_project'
    //           : data.project_payment_name === 'agra_project_payment'
    //           ? 'Agra_Mart_project'
    //           : 'Not in Project',
    //       projectStatus: 'ENROLLED',
    //       userId: searchUser.id,
    //       totalInvestedAmountinProject: totalPayment.toString(),
    //     },
    //   });
    // }

    return 'This';
  }

  async findAll() {
    const enrolledUsersWithProjects =
      await this.prisma.projectEnrolledStatus.findMany({
        where: {
          projectStatus: 'ENROLLED', // Assuming 'ENROLLED' is the status for enrolled projects
        },
        include: {
          user: true, // Include user details
        },
      });

    // Create a map to group enrollments by user
    const userEnrollmentsMap = new Map<string, any>();

    for (const enrollment of enrolledUsersWithProjects) {
      const userId = enrollment.user.id;

      if (!userEnrollmentsMap.has(userId)) {
        // Initialize an entry for the user
        userEnrollmentsMap.set(userId, {
          userId: userId,
          userName: enrollment.user.name, // Assuming 'name' is a field in the User model
          projects: [],
        });
      }

      // Add the project enrollment to the user's list of projects
      userEnrollmentsMap.get(userId).projects.push({
        projectName: enrollment.projectName,
        totalInvestedAmount: enrollment.totalInvestedAmountinProject || '0', // Default to '0' if not provided
      });
    }

    // Convert the map values to an array
    const result = Array.from(userEnrollmentsMap.values());
    return result;

    // console.log('Enrolled Users with Projects:', result);

    // const enrolledUsersWithProjects =
    //   await this.prisma.projectEnrolledStatus.findMany({
    //     where: {
    //       projectStatus: 'ENROLLED', // Assuming 'ENROLLED' is the status for enrolled projects
    //     },
    //     include: {
    //       user: true, // Include user details
    //     },
    //   });

    // // Process the result to get the desired information
    // const result = enrolledUsersWithProjects.map((enrollment) => {
    //   return {
    //     userId: enrollment.user.id,
    //     userName: enrollment.user.name, // Assuming 'name' is a field in the User model
    //     projectName: enrollment.projectName,
    //     totalInvestedAmount: enrollment.totalInvestedAmountinProject || '0', // Default to '0' if not provided
    //   };
    // });

    // console.log('Enrolled Users with Projects and Amount:', result);

    // return
  }

  async findOne(id: string) {
    const enrolledInProjects = await this.prisma.projectEnrolledStatus.findMany(
      {
        where: {
          projectStatus: 'ENROLLED', // Assuming 'ENROLLED' is the status for enrolled projects
          user: {
            id,
          },
        },
      }
    );

    console.log(enrolledInProjects);

    return enrolledInProjects;

    // Create a map to group enrollments by user
    // const userEnrollmentsMap = new Map<string, any>();

    // for (const enrollment of enrolledInProjects) {
    //   const userId = enrollment.user.id;

    //   if (!userEnrollmentsMap.has(userId)) {
    //     // Initialize an entry for the user
    //     userEnrollmentsMap.set(userId, {
    //       userId: userId,
    //       userName: enrollment.user.name, // Assuming 'name' is a field in the User model
    //       projects: [],
    //     });
    //   }

    //   // Add the project enrollment to the user's list of projects
    //   userEnrollmentsMap.get(userId).projects.push({
    //     projectName: enrollment.projectName,
    //     totalInvestedAmount: enrollment.totalInvestedAmountinProject || '0', // Default to '0' if not provided
    //   });
    // }

    // Convert the map values to an array
    // const result = Array.from(userEnrollmentsMap.values());
    // return result;
    // return `This action returns a #${id} projectEnrolled`;
  }

  update(id: number, updateProjectEnrolledInput: UpdateProjectEnrolledInput) {
    return `This action updates a #${id} projectEnrolled`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectEnrolled`;
  }
}
