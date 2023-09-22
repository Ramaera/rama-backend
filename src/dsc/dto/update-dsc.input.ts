import {
  InputType,
  Field,
  Int,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { DSCSTATUS } from '@prisma/client';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class UpdateDscInput {
  @Field(() => String, { description: 'User Id ' })
  id: string;

  @Field(() => String, { description: 'The Date At Which DSC Created  ' })
  DscCreatedDate?: string;

  @Field(() => String, { description: 'The Date At Which DSC Will Expire ' })
  DscExpiryDate?: string;

  @Field(() => GraphQLJSONObject, {
    description: 'The Date At Which DSC Will Expire ',
  })
  metaData: Record<string, any>;

  @Field(() => DSCSTATUS, { description: 'The Date At Which DSC Will Expire ' })
  DSCSTATUS?: DSCSTATUS;
}

registerEnumType(DSCSTATUS, {
  name: 'DSCSTATUS',
});
