import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { DSCSTATUS } from '@prisma/client';

registerEnumType(DSCSTATUS, {
  name: 'DSCSTATUS',
  description: 'User DSC Status',
});

@ObjectType()
export class DscOutputDataField {
  @Field(() => DSCSTATUS, { description: 'Dsc Status' })
  DSCStatus?: DSCSTATUS;

  @Field(() => String, { description: 'User Id ' })
  userId: string;

  @Field(() => String, { description: 'The Date At Which DSC Created  ' })
  DscCreatedDate: string;

  @Field(() => String, { description: 'The Date At Which DSC Will Expire ' })
  DscExpiryDate: string;
}
