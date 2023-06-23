import { Module } from '@nestjs/common';
import { KycAgencyService } from './kyc-agency.service';
import { KycAgencyResolver } from './kyc-agency.resolver';

@Module({
  providers: [KycAgencyResolver, KycAgencyService]
})
export class KycAgencyModule {}
