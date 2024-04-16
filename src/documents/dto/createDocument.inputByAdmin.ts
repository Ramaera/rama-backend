import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDocumentInputByAdmin {
  @Field()
  @IsNotEmpty()
  url: string;

  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  referralAgencyCode?: string;
}
