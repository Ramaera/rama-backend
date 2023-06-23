import { InputType, Int, Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetKycAgency {
  @Field(() => String)
  userId: string;
}

@ArgsType()
export class GetAllUserofSpecificKycAgency {
  @Field(() => String)
  agencyCode: string;
}
