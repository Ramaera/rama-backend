import * as NestJsGraphQL from "@nestjs/graphql";
import { NomineeCreateOrConnectWithoutUserInput } from "../../nominee/inputs/NomineeCreateOrConnectWithoutUserInput.input";
import { NomineeCreateWithoutUserInput } from "../../nominee/inputs/NomineeCreateWithoutUserInput.input";
import { NomineeUpdateWithoutUserInput } from "../../nominee/inputs/NomineeUpdateWithoutUserInput.input";
import { NomineeUpsertWithoutUserInput } from "../../nominee/inputs/NomineeUpsertWithoutUserInput.input";
import { NomineeWhereUniqueInput } from "../../nominee/inputs/NomineeWhereUniqueInput.input";

@NestJsGraphQL.InputType('NomineeUpdateOneWithoutUserNestedInput', { isAbstract: true })
export class NomineeUpdateOneWithoutUserNestedInput {
  @NestJsGraphQL.Field(() => NomineeCreateWithoutUserInput, { nullable: true })
  create?: NomineeCreateWithoutUserInput | undefined;

  @NestJsGraphQL.Field(() => NomineeCreateOrConnectWithoutUserInput, { nullable: true })
  connectOrCreate?: NomineeCreateOrConnectWithoutUserInput | undefined;

  @NestJsGraphQL.Field(() => NomineeUpsertWithoutUserInput, { nullable: true })
  upsert?: NomineeUpsertWithoutUserInput | undefined;

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  disconnect?: boolean | undefined;

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  delete?: boolean | undefined;

  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput, { nullable: true })
  connect?: NomineeWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => NomineeUpdateWithoutUserInput, { nullable: true })
  update?: NomineeUpdateWithoutUserInput | undefined;
}
