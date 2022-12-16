import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum NomineeOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  name = 'name',
  relationship = 'relationship',
}

registerEnumType(NomineeOrderField, {
  name: 'NomineeOrderField',
  description: 'Properties by which Nominee connections can be ordered.',
});

@InputType()
export class NomineeOrder extends Order {
  field: NomineeOrderField;
}