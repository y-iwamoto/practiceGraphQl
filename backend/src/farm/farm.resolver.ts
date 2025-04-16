import { Resolver, Mutation, Args, Query, Info } from '@nestjs/graphql';
import { FarmService } from './farm.service';
import { Farm } from './entities/farm.entity';
import { CreateFarmInput } from './dto/create-farm.input';
import { GraphQLError, GraphQLResolveInfo, Kind } from 'graphql';

@Resolver(() => Farm)
export class FarmResolver {
  constructor(private readonly farmService: FarmService) { }

  @Query(() => [Farm])
  async farms(@Info() info: GraphQLResolveInfo) {
    const selections = info.fieldNodes[0].selectionSet?.selections;
    const hasOwner = selections?.some(
      (selection) =>
        selection.kind === Kind.FIELD && selection.name.value === 'owner',
    );
    const relations = hasOwner ? { owner: true } : {};
    return this.farmService.findAll(relations);
  }

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
