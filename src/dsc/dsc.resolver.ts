import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DscService } from './dsc.service';
import { Dsc } from './entities/dsc.entity';
import { CreateDscInput } from './dto/create-dsc.input';
import { UpdateDscInput } from './dto/update-dsc.input';

@Resolver(() => Dsc)
export class DscResolver {
  constructor(private readonly dscService: DscService) {}

  @Mutation(() => Dsc)
  createDsc(@Args('createDscInput') createDscInput: CreateDscInput) {
    return this.dscService.create(createDscInput);
  }

  @Query(() => [Dsc], { name: 'dsc' })
  findAll() {
    return this.dscService.findAll();
  }

  @Query(() => Dsc, { name: 'dsc' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dscService.findOne(id);
  }

  // @Mutation(() => Dsc)
  // updateDsc(@Args('updateDscInput') updateDscInput: UpdateDscInput) {
  //   return this.dscService.update(updateDscInput.id, updateDscInput);
  // }

  @Mutation(() => Dsc)
  removeDsc(@Args('id', { type: () => Int }) id: number) {
    return this.dscService.remove(id);
  }
}
