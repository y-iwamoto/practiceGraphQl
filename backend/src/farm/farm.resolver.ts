import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FarmService } from './farm.service';
import { Farm } from './entities/farm.entity';
import { CreateFarmInput } from './dto/create-farm.input';
import { GraphQLError } from 'graphql';

@Resolver(() => Farm)
export class FarmResolver {
  constructor(private readonly farmService: FarmService) { }

  @Mutation(() => Farm)
  async createFarm(@Args('createFarmInput') createFarmInput: CreateFarmInput) {
    try {
      return this.farmService.create(createFarmInput);
    } catch (error: unknown) {
      if (error instanceof GraphQLError) {
        throw new GraphQLError('農場の作成に失敗しました', {
          extensions: {
            ...error.extensions,
            code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          },
        });
      }
      throw error;
    }
  }
}
