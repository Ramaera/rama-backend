import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Document {
  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  title: string;
  @Field()
  url: string;
  @Field()
  id: string;

  @Field()
  status: string;

  @Field()
  user: User;
}
