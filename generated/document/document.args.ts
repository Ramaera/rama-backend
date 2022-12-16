import * as NestJsGraphQL from "@nestjs/graphql";
import { DocumentScalarFieldEnum } from "../common/enums";
import { DocumentCreateInput } from "../document/inputs/DocumentCreateInput.input";
import { DocumentCreateManyInput } from "../document/inputs/DocumentCreateManyInput.input";
import { DocumentOrderByWithAggregationInput } from "../document/inputs/DocumentOrderByWithAggregationInput.input";
import { DocumentOrderByWithRelationInput } from "../document/inputs/DocumentOrderByWithRelationInput.input";
import { DocumentScalarWhereWithAggregatesInput } from "../document/inputs/DocumentScalarWhereWithAggregatesInput.input";
import { DocumentUpdateInput } from "../document/inputs/DocumentUpdateInput.input";
import { DocumentUpdateManyMutationInput } from "../document/inputs/DocumentUpdateManyMutationInput.input";
import { DocumentWhereInput } from "../document/inputs/DocumentWhereInput.input";
import { DocumentWhereUniqueInput } from "../document/inputs/DocumentWhereUniqueInput.input";

@NestJsGraphQL.ArgsType()
export class AggregateDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  where?: DocumentWhereInput | undefined;

  @NestJsGraphQL.Field(() => [DocumentOrderByWithRelationInput], { nullable: true })
  orderBy?: DocumentOrderByWithRelationInput[] | undefined;

  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput, { nullable: true })
  cursor?: DocumentWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  skip?: number | undefined;
}

@NestJsGraphQL.ArgsType()
export class CreateManyDocumentArgs {
  @NestJsGraphQL.Field(() => [DocumentCreateManyInput])
  data!: DocumentCreateManyInput[];

  @NestJsGraphQL.Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean | undefined;
}

@NestJsGraphQL.ArgsType()
export class CreateOneDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentCreateInput)
  data!: DocumentCreateInput;
}

@NestJsGraphQL.ArgsType()
export class DeleteManyDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  where?: DocumentWhereInput | undefined;
}

@NestJsGraphQL.ArgsType()
export class DeleteOneDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput)
  where!: DocumentWhereUniqueInput;
}

@NestJsGraphQL.ArgsType()
export class FindFirstDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  where?: DocumentWhereInput | undefined;

  @NestJsGraphQL.Field(() => [DocumentOrderByWithRelationInput], { nullable: true })
  orderBy?: DocumentOrderByWithRelationInput[] | undefined;

  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput, { nullable: true })
  cursor?: DocumentWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  skip?: number | undefined;

  @NestJsGraphQL.Field(() => [DocumentScalarFieldEnum], { nullable: true })
  distinct?: Array<"id" | "title" | "url" | "userId" | "status"> | undefined;
}

@NestJsGraphQL.ArgsType()
export class FindManyDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  where?: DocumentWhereInput | undefined;

  @NestJsGraphQL.Field(() => [DocumentOrderByWithRelationInput], { nullable: true })
  orderBy?: DocumentOrderByWithRelationInput[] | undefined;

  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput, { nullable: true })
  cursor?: DocumentWhereUniqueInput | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  skip?: number | undefined;

  @NestJsGraphQL.Field(() => [DocumentScalarFieldEnum], { nullable: true })
  distinct?: Array<"id" | "title" | "url" | "userId" | "status"> | undefined;
}

@NestJsGraphQL.ArgsType()
export class FindUniqueDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput)
  where!: DocumentWhereUniqueInput;
}

@NestJsGraphQL.ArgsType()
export class GroupByDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  where?: DocumentWhereInput | undefined;

  @NestJsGraphQL.Field(() => [DocumentOrderByWithAggregationInput], { nullable: true })
  orderBy?: DocumentOrderByWithAggregationInput[] | undefined;

  @NestJsGraphQL.Field(() => [DocumentScalarFieldEnum])
  by!: Array<"id" | "title" | "url" | "userId" | "status">;

  @NestJsGraphQL.Field(() => DocumentScalarWhereWithAggregatesInput, { nullable: true })
  having?: DocumentScalarWhereWithAggregatesInput | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @NestJsGraphQL.Field(() => NestJsGraphQL.Int, { nullable: true })
  skip?: number | undefined;
}

@NestJsGraphQL.ArgsType()
export class UpdateManyDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentUpdateManyMutationInput)
  data!: DocumentUpdateManyMutationInput;

  @NestJsGraphQL.Field(() => DocumentWhereInput, { nullable: true })
  where?: DocumentWhereInput | undefined;
}

@NestJsGraphQL.ArgsType()
export class UpdateOneDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentUpdateInput)
  data!: DocumentUpdateInput;

  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput)
  where!: DocumentWhereUniqueInput;
}

@NestJsGraphQL.ArgsType()
export class UpsertOneDocumentArgs {
  @NestJsGraphQL.Field(() => DocumentWhereUniqueInput)
  where!: DocumentWhereUniqueInput;

  @NestJsGraphQL.Field(() => DocumentCreateInput)
  create!: DocumentCreateInput;

  @NestJsGraphQL.Field(() => DocumentUpdateInput)
  update!: DocumentUpdateInput;
}
