import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/auth/enum/role.enum';
import { FarmOwnershipGuard } from '@/auth/guards/farm-ownership.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { UpdateProduceStockInput } from '@/produce-stock/dto/update-produce-stock.input';
import { ProduceStock } from '@/produce-stock/entities/produce-stock.entity/produce-stock.entity';
import { ProduceStockService } from '@/produce-stock/produce-stock.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver(() => ProduceStock)
export class ProduceStockResolver {
  constructor(private readonly produceStockService: ProduceStockService) { }

  @Mutation(() => ProduceStock)
  @UseGuards(RolesGuard, FarmOwnershipGuard)
  @Roles(Role.Farmer, Role.Admin)
  updateProduceStock(
    @Args('updateProduceStockInput')
    updateProduceStockInput: UpdateProduceStockInput,
  ) {
    return this.produceStockService.update(updateProduceStockInput);
  }
}
