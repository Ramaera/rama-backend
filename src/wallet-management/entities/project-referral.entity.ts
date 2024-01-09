import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class KYCREFERRAL {
  @Field({ description: 'Id of Transaction' })
  id: number;

  @Field({ description: 'Transaction Created At ' })
  createdAt: Date;

  @Field({ description: 'Transaction Updated At ' })
  updatedAt: Date;

  @Field({ description: 'Agency COde' })
  agencyCode: string;

  @Field({ description: 'user Id ' })
  userId: string;

  @Field({ description: 'Document Id ' })
  documentId: string;
}
