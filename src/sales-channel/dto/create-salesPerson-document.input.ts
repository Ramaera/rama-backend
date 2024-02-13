import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSalesPersonDocument {
  @Field()
  @IsNotEmpty()
  url: string;

  @Field()
  @IsNotEmpty()
  title: string;
}
