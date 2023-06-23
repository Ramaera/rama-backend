import { CreateKycAgencyCodeInput } from './create-kyc-agency.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateKycAgencyInput extends PartialType(
  CreateKycAgencyCodeInput
) {
  @Field(() => Int)
  id: number;
}
