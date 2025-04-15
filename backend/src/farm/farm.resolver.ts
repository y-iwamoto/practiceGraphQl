import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FarmService } from './farm.service';
import { Farm } from './entities/farm.entity';
import { CreateFarmInput } from './dto/create-farm.input';

@Resolver(() => Farm)
export class FarmResolver {
  constructor(private readonly farmService: FarmService) { }

  @Mutation(() => Farm)
  async createFarm(@Args('createFarmInput') createFarmInput: CreateFarmInput) {
    return this.farmService.create(createFarmInput);
  }
}
