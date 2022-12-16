import { Module } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { NomineeResolver } from './nominee.resolver'
import { NomineeService } from './nominee.service'

@Module({
  providers: [NomineeResolver, NomineeService, PrismaService]
})
export class NomineeModule { }

