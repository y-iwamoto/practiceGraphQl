import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ProduceItemService } from './produce-item.service';
import { ProduceItem } from './entities/produce-item.entity';
import { CreateProduceItemInput } from './dto/create-produce-item.input';
import { FarmOwnershipGuard } from '@/auth/guards/farm-ownership.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => ProduceItem)
export class ProduceItemResolver {
  constructor(private readonly produceItemService: ProduceItemService) { }

  @Mutation(() => ProduceItem)
  @UseGuards(FarmOwnershipGuard)
  createProduceItem(
    @Args('createProduceItemInput')
    createProduceItemInput: CreateProduceItemInput
  ) {
    return this.produceItemService.create(createProduceItemInput);
  }

}
