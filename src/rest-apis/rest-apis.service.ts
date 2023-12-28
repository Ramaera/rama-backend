import { Injectable } from '@nestjs/common';
import { CreateRestApiDto } from './dto/create-rest-api.dto';
import { UpdateRestApiDto } from './dto/update-rest-api.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RestApisService {
  constructor(private prisma: PrismaService) {}

  create(createRestApiDto: CreateRestApiDto) {
    return 'This action adds a new restApi';
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        name: true,
        pw_id: true,
        kyc: true,
        createdAt: true,
        membership: true,
        referralAgencyCode: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} restApi`;
  }

  update(id: number, updateRestApiDto: UpdateRestApiDto) {
    return `This action updates a #${id} restApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} restApi`;
  }
}
