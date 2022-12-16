import * as NestJsGraphQL from "@nestjs/graphql";
import { NomineeScalarFieldEnum } from "../common/enums";
import { NomineeCreateInput } from "../nominee/inputs/NomineeCreateInput.input";
import { NomineeCreateManyInput } from "../nominee/inputs/NomineeCreateManyInput.input";
import { NomineeOrderByWithAggregationInput } from "../nominee/inputs/NomineeOrderByWithAggregationInput.input";
import { NomineeOrderByWithRelationInput } from "../nominee/inputs/NomineeOrderByWithRelationInput.input";
import { NomineeScalarWhereWithAggregatesInput } from "../nominee/inputs/NomineeScalarWhereWithAggregatesInput.input";
import { NomineeUpdateInput } from "../nominee/inputs/NomineeUpdateInput.input";
import { NomineeUpdateManyMutationInput } from "../nominee/inputs/NomineeUpdateManyMutationInput.input";
import { NomineeWhereInput } from "../nominee/inputs/NomineeWhereInput.input";
import { NomineeWhereUniqueInput } from "../nominee/inputs/NomineeWhereUniqueInput.input";

@NestJsGraphQL.ArgsType()
export class AggregateNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeWhereInput, { nullable: true })
  where?: NomineeWhereInput | undefined;

  @NestJsGraphQL.Field(() => [NomineeOrderByWithRelationInput], { nullable: true })
  orderBy?: NomineeOrderByWithRelationInput[] | undefined;

  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput, { nullable: true })
  cursor?: NomineeWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  skip?: number | undefined;
}

@NestJsGraphQL.ArgsType()
export class CreateManyNomineeArgs {
  @NestJsGraphQL.Field(() => [NomineeCreateManyInput])
  data!: NomineeCreateManyInput[];

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean | undefined;
}

@NestJsGraphQL.ArgsType()
export class CreateOneNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeCreateInput)
  data!: NomineeCreateInput;
}

@NestJsGraphQL.ArgsType()
export class DeleteManyNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeWhereInput, { nullable: true })
  where?: NomineeWhereInput | undefined;
}

@NestJsGraphQL.ArgsType()
export class DeleteOneNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput)
  where!: NomineeWhereUniqueInput;
}

@NestJsGraphQL.ArgsType()
export class FindFirstNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeWhereInput, { nullable: true })
  where?: NomineeWhereInput | undefined;

  @NestJsGraphQL.Field(() => [NomineeOrderByWithRelationInput], { nullable: true })
  orderBy?: NomineeOrderByWithRelationInput[] | undefined;

  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput, { nullable: true })
  cursor?: NomineeWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  skip?: number | undefined;

  @NestJsGraphQL.Field(() => [NomineeScalarFieldEnum], { nullable: true })
  distinct?: Array<"userPw_id" | "name" | "relationship"> | undefined;
}

@NestJsGraphQL.ArgsType()
export class FindManyNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeWhereInput, { nullable: true })
  where?: NomineeWhereInput | undefined;

  @NestJsGraphQL.Field(() => [NomineeOrderByWithRelationInput], { nullable: true })
  orderBy?: NomineeOrderByWithRelationInput[] | undefined;

  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput, { nullable: true })
  cursor?: NomineeWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  skip?: number | undefined;

  @NestJsGraphQL.Field(() => [NomineeScalarFieldEnum], { nullable: true })
  distinct?: Array<"userPw_id" | "name" | "relationship"> | undefined;
}

@NestJsGraphQL.ArgsType()
export class FindUniqueNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput)
  where!: NomineeWhereUniqueInput;
}

@NestJsGraphQL.ArgsType()
export class GroupByNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeWhereInput, { nullable: true })
  where?: NomineeWhereInput | undefined;

  @NestJsGraphQL.Field(() => [NomineeOrderByWithAggregationInput], { nullable: true })
  orderBy?: NomineeOrderByWithAggregationInput[] | undefined;

  @NestJsGraphQL.Field(() => [NomineeScalarFieldEnum])
  by!: Array<"userPw_id" | "name" | "relationship">;

  @NestJsGraphQL.Field(() => NomineeScalarWhereWithAggregatesInput, { nullable: true })
  having?: NomineeScalarWhereWithAggregatesInput | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  skip?: number | undefined;
}

@NestJsGraphQL.ArgsType()
export class UpdateManyNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeUpdateManyMutationInput)
  data!: NomineeUpdateManyMutationInput;

  @NestJsGraphQL.Field(() => NomineeWhereInput, { nullable: true })
  where?: NomineeWhereInput | undefined;
}

@NestJsGraphQL.ArgsType()
export class UpdateOneNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeUpdateInput)
  data!: NomineeUpdateInput;

  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput)
  where!: NomineeWhereUniqueInput;
}

@NestJsGraphQL.ArgsType()
export class UpsertOneNomineeArgs {
  @NestJsGraphQL.Field(() => NomineeWhereUniqueInput)
  where!: NomineeWhereUniqueInput;

  @NestJsGraphQL.Field(() => NomineeCreateInput)
  create!: NomineeCreateInput;

  @NestJsGraphQL.Field(() => NomineeUpdateInput)
  update!: NomineeUpdateInput;
}
