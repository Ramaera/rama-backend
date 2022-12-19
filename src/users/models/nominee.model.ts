import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class nomineeModel extends BaseModel {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  relationship?: string;
}
