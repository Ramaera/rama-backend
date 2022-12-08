import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum DocumentOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  title = 'title',
  url = 'url',
}

registerEnumType(DocumentOrderField, {
  name: 'DocumentOrderField',
  description: 'Properties by which document connections can be ordered.',
});

@InputType()
export class DocumentOrder extends Order {
  field: DocumentOrderField;
}