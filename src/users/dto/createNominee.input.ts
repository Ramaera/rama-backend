import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NomineeInput {

  @Field({ nullable: true })
  id: string;

  @Field(()=>String,{ nullable: true })
  name: string;

  @Field({ nullable: true })
  relationship: string;

}


@InputType()
export class UpdatedData {

  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(()=>String,{ nullable: true })
  nomineeName?: string;

  @Field({ nullable: true })
  relationship?: string;
  
}