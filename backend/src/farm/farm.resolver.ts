import { Resolver, Mutation, Args, Query, Info } from '@nestjs/graphql';
import { FarmService } from './farm.service';
import { Farm } from './entities/farm.entity';
import { CreateFarmInput } from './dto/create-farm.input';
import { GraphQLError, GraphQLResolveInfo, Kind } from 'graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/auth/enum/role.enum';

@Resolver(() => Farm)
export class FarmResolver {
  private readonly RELATIONS_KEYS = ['owner', 'produceItems', 'produceStocks'];

  constructor(private readonly farmService: FarmService) { }

  @Query(() => [Farm])
  async farms(@Info() info: GraphQLResolveInfo) {
    const relations = this.parseRelationsFromInfo(info);
    return this.farmService.findAll(relations);
  }

  @Query(() => Farm)
  async farm(@Args('id') id: number, @Info() info: GraphQLResolveInfo) {
    const relations = this.parseRelationsFromInfo(info);
    const farm = await this.farmService.findOne(id, relations, {
      filterProduceStock: true,
    });

    if (!farm) {
      throw new GraphQLError('指定されたIDの農場が見つかりません', {
        extensions: {
          code: 'NOT_FOUND',
        },
      });
    }
    return farm;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Farmer, Role.Admin)
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

  private parseRelationsFromInfo(
    info: GraphQLResolveInfo,
  ): Record<string, boolean> {
    const selections = info.fieldNodes[0].selectionSet?.selections;
    const relations: Record<string, boolean> = {};

    for (const key of this.RELATIONS_KEYS) {
      const hasField = selections?.some(
        (selection) =>
          selection.kind === Kind.FIELD && selection.name.value === key,
      );
      if (hasField) {
        relations[key] = true;
      }
    }
    return relations;
  }
}
