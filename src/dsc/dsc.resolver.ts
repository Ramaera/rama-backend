import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DscService } from './dsc.service';
import { DscOutputDataField } from './entities/dsc.entity';
import { CreateDscInput } from './dto/create-dsc.input';
import { UpdateDscInput } from './dto/update-dsc.input';

@Resolver(() => DscOutputDataField)
export class DscResolver {
  constructor(private readonly dscService: DscService) {}

  @Mutation(() => DscOutputDataField)
  createDsc(@Args('createDscInput') createDscInput: CreateDscInput) {
    return this.dscService.create(createDscInput);
  }

  @Query(() => [DscOutputDataField], { name: 'dsc' })
  findAll() {
    return this.dscService.findAll();
  }

  @Query(() => DscOutputDataField, { name: 'dsc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dscService.findOne(id);
  }

  @Mutation(() => DscOutputDataField)
  removeDsc(@Args('id', { type: () => Int }) id: number) {
    return this.dscService.remove(id);
  }
}
