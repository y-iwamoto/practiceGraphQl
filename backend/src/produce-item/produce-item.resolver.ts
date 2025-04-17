import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProduceItemService } from './produce-item.service';
import { ProduceItem } from './entities/produce-item.entity';
import { CreateProduceItemInput } from './dto/create-produce-item.input';
import { UpdateProduceItemInput } from './dto/update-produce-item.input';
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

  @Query(() => [ProduceItem], { name: 'produceItem' })
  findAll() {
    return this.produceItemService.findAll();
  }

  @Query(() => ProduceItem, { name: 'produceItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.produceItemService.findOne(id);
  }

  @Mutation(() => ProduceItem)
  updateProduceItem(@Args('updateProduceItemInput') updateProduceItemInput: UpdateProduceItemInput) {
    return this.produceItemService.update(updateProduceItemInput.id, updateProduceItemInput);
  }

  @Mutation(() => ProduceItem)
  removeProduceItem(@Args('id', { type: () => Int }) id: number) {
    return this.produceItemService.remove(id);
  }
}
