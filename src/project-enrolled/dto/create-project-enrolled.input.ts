import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';

@InputType()
export class CreateProjectEnrolledInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@InputType()
export class projectDataInput {
  @Field(() => String, { description: ' This is User Id' })
  userId: string;

  @Field(() => PROJECT_PAYMENT, {
    description:
      'Project Payment Name Just Select Hajupir , Agra,HYDERABAD ETC',
  })
  project_payment_name: PROJECT_PAYMENT;
}

export const PROJECT_PAYMENT = {
  HAJIPUR: 'hajipur_project_payment',
  AGRA: 'agra_project_payment',
  HYDERABAD: 'hyderabad_project_payment',
  JHANSI: 'jhansi_project_payment',
  CHAPRA: 'chapra_project_payment',
};

export type PROJECT_PAYMENT =
  typeof PROJECT_PAYMENT[keyof typeof PROJECT_PAYMENT];

registerEnumType(PROJECT_PAYMENT, {
  name: 'PROJECT_PAYMENT',
});
