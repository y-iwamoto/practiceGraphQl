import { FarmOwnershipGuard } from '@/auth/guards/farm-ownership.guard';
import { UpdateProduceStockInput } from '@/produce-stock/dto/update-produce-stock.input';
import { ProduceStock } from '@/produce-stock/entities/produce-stock.entity/produce-stock.entity';
import { ProduceStockService } from '@/produce-stock/produce-stock.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => ProduceStock)
export class ProduceStockResolver {
  constructor(private readonly produceStockService: ProduceStockService) { }

  @Mutation(() => ProduceStock)
  @UseGuards(FarmOwnershipGuard)
  updateProduceStock(
    @Args('updateProduceStockInput')
    updateProduceStockInput: UpdateProduceStockInput,
  ) {
    return this.produceStockService.update(updateProduceStockInput);
  }
}
