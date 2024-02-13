import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesChannelService } from './sales-channel.service';
import { SalesChannel } from './entities/sales-channel.entity';
import { CreateSalesChannelInput } from './dto/create-sales-channel.input';
import { UpdateSalesChannelInput } from './dto/update-sales-channel.input';
import { SalesPersonOutPut } from 'src/kyc-agency/entities/salesperson.entity';
import { CreateSalesPerson } from 'src/kyc-agency/dto/create-salesPerson.input';

@Resolver(() => SalesChannel)
export class SalesChannelResolver {
  constructor(private readonly salesChannelService: SalesChannelService) {}

  // @Mutation(() => SalesChannel)
  // createSalesChannel(@Args('createSalesChannelInput') createSalesChannelInput: CreateSalesChannelInput) {
  //   return this.salesChannelService.create(createSalesChannelInput);
  // }

  @Query(() => [SalesChannel], { name: 'salesChannel' })
  findAll() {
    return this.salesChannelService.findAll();
  }

  @Query(() => SalesChannel, { name: 'salesPersonsInAAgency' })
  findOne(@Args('agencyCode', { type: () => String }) agencyCode: string) {
    return this.salesChannelService.findOne(agencyCode);
  }

  @Mutation(() => SalesChannel)
  updateSalesChannel(
    @Args('updateSalesChannelInput')
    updateSalesChannelInput: UpdateSalesChannelInput
  ) {
    return this.salesChannelService.update(
      updateSalesChannelInput.id,
      updateSalesChannelInput
    );
  }

  @Mutation(() => SalesPersonOutPut)
  createSalesPerson(@Args('data') data: CreateSalesPerson) {
    return this.salesChannelService.createSalesPerson(data);
  }

  @Mutation(() => SalesChannel)
  removeSalesChannel(@Args('id', { type: () => Int }) id: number) {
    return this.salesChannelService.remove(id);
  }
}
