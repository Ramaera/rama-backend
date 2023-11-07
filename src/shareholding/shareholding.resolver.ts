import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShareholdingService } from './shareholding.service';
import { Shareholding } from './entities/shareholding.entity';
import { CreateShareholdingInput } from './dto/create-shareholding.input';
import { UpdateShareholdingInput } from './dto/update-shareholding.input';
import { SearchInvestmentType } from './dto/search-shareholding.input';
import { SearchInput } from 'src/users/dto/search-user.input';

@Resolver(() => Shareholding)
export class ShareholdingResolver {
  constructor(private readonly shareholdingService: ShareholdingService) {}

  @Mutation(() => Shareholding)
  createShareholding(
    @Args('data') createShareholdingInput: CreateShareholdingInput
  ) {
    return this.shareholdingService.create(createShareholdingInput);
  }

  @Query(() => [Shareholding], { name: 'searchShareHolding' })
  findAll(
    @Args('input') input: SearchInvestmentType,
    @Args({ name: 'take', type: () => Int, defaultValue: 100 }) take: number,
    @Args({ name: 'skip', type: () => Int, defaultValue: 0 }) skip: number
  ) {
    return this.shareholdingService.findAll(input, {
      skip,
      take,
    });
  }

  @Query(() => [Shareholding], { name: 'TotalShareholders' })
  findAllShareHolder(
    @Args({ name: 'take', type: () => Int, defaultValue: 100 }) take: number,
    @Args({ name: 'skip', type: () => Int, defaultValue: 0 }) skip: number
  ) {
    return this.shareholdingService.findShareholders({ take, skip });
  }

  @Query(() => [Shareholding], { name: 'shareholding' })
  findOne(@Args('id', { type: () => String }) id: string) {
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

  // ********************* Search Shareholder ********************************
  @Query(() => [Shareholding])
  async searchShareholder(@Args('input') input: SearchInvestmentType) {
    return this.shareholdingService.searchShareHolder(input);
  }
}
