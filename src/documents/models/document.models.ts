import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class DocumentModal extends BaseModel {

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  url?: string;
}
