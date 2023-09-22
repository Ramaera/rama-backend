import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShareholdingService } from './shareholding.service';
import { Shareholding } from './entities/shareholding.entity';
import { CreateShareholdingInput } from './dto/create-shareholding.input';
import { UpdateShareholdingInput } from './dto/update-shareholding.input';

@Resolver(() => Shareholding)
export class ShareholdingResolver {
  constructor(private readonly shareholdingService: ShareholdingService) {}

  @Mutation(() => Shareholding)
  createShareholding(
    @Args('data') createShareholdingInput: CreateShareholdingInput
  ) {
    return this.shareholdingService.create(createShareholdingInput);
  }

  // @Query('getInvestment')
  // findAll() {
  //   return this.shareholdingService.findAll();
  // }

  @Query(() => Shareholding, { name: 'shareholding' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shareholdingService.findOne(id);
  }

  @Mutation(() => Shareholding)
  updateShareholding(
    @Args('data')
    updateShareholdingInput: UpdateShareholdingInput
  ) {
    return this.shareholdingService.update(
      updateShareholdingInput.id,
      updateShareholdingInput
    );
  }

  @Mutation(() => Shareholding)
  removeShareholding(@Args('id', { type: () => Int }) id: number) {
    return this.shareholdingService.remove(id);
  }
}
