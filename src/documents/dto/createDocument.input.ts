import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDocumentInput {
  @Field()
  @IsNotEmpty()
  url: string;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  referralAgencyCode?: string;
}
