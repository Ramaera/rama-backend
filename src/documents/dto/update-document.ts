import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { PROJECTSTATUS, STATUS } from '@prisma/client';
import { DateTime } from 'graphql-scalars/typings/mocks';

@InputType()
export class UpdateDocumentsInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  referralAgencyCode?: string;

  @Field(() => STATUS, { nullable: true })
  status?: STATUS;
}

@InputType()
export class ProjectEnrollmentStatusInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  projectName?: string;

  @Field(() => PROJECTSTATUS, { nullable: true })
  projectStatus?: PROJECTSTATUS;
}

@InputType()
export class UpdateDocumentStatusByAdmin {
  @Field()
  id: string;

  @Field(() => STATUS)
  status: STATUS;

  @Field(() => String, { nullable: true })
  approvalDate?: string;

  @Field(() => Date, { nullable: true })
  approvalDocumentDate?: Date;
}

registerEnumType(STATUS, {
  name: 'STATUS',
});

registerEnumType(PROJECTSTATUS, {
  name: 'PROJECTSTATUS',
});
