import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class NomineeModel {

  @Field(() => String)
  id!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(()=> String,{nullable:false})
  name!: string;

  @Field(() => String, { nullable: false })
  relationship!: string;
  
}
