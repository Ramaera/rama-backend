import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDocumentByAdmin {
  @Field()
  @IsNotEmpty()
  url: string;

  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  title: string;
}
