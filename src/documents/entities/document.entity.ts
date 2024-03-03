import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Document {
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  title: string;

  @Field()
  url: string;

  @Field()
  id: string;

  @Field()
  referralAgencyCode: string;

  @Field({ nullable: true })
  status: string;

  @Field()
  user: User;
}

@ObjectType()
export class DocumentUrl {
  @Field()
  url: string;
}
