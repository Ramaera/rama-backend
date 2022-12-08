import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Document extends BaseModel {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  url?: string;
}
