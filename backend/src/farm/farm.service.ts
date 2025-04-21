import { Injectable } from '@nestjs/common';
import { CreateFarmInput } from './dto/create-farm.input';
import { Farm } from '@/farm/entities/farm.entity';
import { DataSource, FindOptionsRelations } from 'typeorm';
import { UserService } from '@/user/user.service';

@Injectable()
export class FarmService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
  ) { }

  async findAll(relations: FindOptionsRelations<Farm>): Promise<Farm[]> {
    return this.dataSource.getRepository(Farm).find({
      relations,
    });
  }

  async findOne(
    id: number,
    relations: FindOptionsRelations<Farm> = {},
    options: { filterProduceStock?: boolean } = {},
  ): Promise<Farm | null> {
    const queryBuilder = this.dataSource
      .getRepository(Farm)
      .createQueryBuilder('farm')
      .andWhere('farm.id = :id', { id });

    if (relations.owner) {
      queryBuilder.leftJoinAndSelect('farm.owner', 'owner');
    }

    if (relations.produceItems) {
      queryBuilder
        .leftJoinAndSelect('farm.produceItems', 'produceItems')
        .leftJoin('produceItems.produceStock', 'produceStock');

      if (options.filterProduceStock) {
        queryBuilder.andWhere(
          'EXISTS (SELECT 1 FROM produce_stock WHERE produce_stock."produceItemId" = produceItems.id AND produce_stock.amount > :minAmount)',
          {
            minAmount: 0,
          },
        );
      }
    }

    if (relations.produceStocks) {
      queryBuilder.leftJoinAndSelect('farm.produceStocks', 'produceStocks');

      if (options.filterProduceStock) {
        queryBuilder.andWhere('produceStocks.amount > :minAmount', {
          minAmount: 0,
        });
      }
    }

    return queryBuilder.getOne();
  }

  async create(createFarmInput: CreateFarmInput): Promise<Farm> {
    const user = await this.userService.findOne(createFarmInput.ownerId);
    if (!user) {
      throw new Error('ユーザーが存在しません');
    }

    return this.dataSource.getRepository(Farm).save({
      ...createFarmInput,
      owner: user,
    });
  }
}
