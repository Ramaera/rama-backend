import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { DSCSTATUS } from '@prisma/client';

@InputType()
export class CreateDscInput {
  @Field(() => String, { description: 'User Id ' })
  userId: string;

  @Field(() => String, { description: 'The Date At Which DSC Created  ' })
  DscCreatedDate: string;

  @Field(() => String, { description: 'The Date At Which DSC Will Expire ' })
  DscExpiryDate: string;

  @Field(() => DSCSTATUS, { description: 'The Date At Which DSC Will Expire ' })
  DSCSTATUS: DSCSTATUS;
}

registerEnumType(DSCSTATUS, {
  name: 'DSCSTATUS',
});
