import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NomineeInput {

  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  relationship: string;
}