import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class DocumentModal extends BaseModel {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => String, { nullable: true })
  title!: string;

  @Field(() => String, { nullable: true })
  url?: string;
  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => String, { nullable: true })
  utrNo?: string;
}
