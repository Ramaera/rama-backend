import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCountDTO {
  @Field(() => Int)
  totalSubscribers?: number;

  @Field(() => Int)
  totalBasicSubscribers?: number;

  @Field(() => Int)
  totalAdvanceSubscribers?: number;

  @Field(() => Int)
  totalHajipurSubscribers?: number;

  @Field(() => Int)
  totalAgraSubscribers?: number;
}

@ObjectType()
export class ShareHolderCountDTO {
  @Field(() => Int)
  TotalShareholders?: number;

  @Field(() => Int)
  TotalBasicShareHolder?: number;

  @Field(() => Int)
  TotalAdvanceShareHolder?: number;

  @Field(() => Int)
  TotalHajipurShareHolder?: number;
}
