import { Farm } from '@/farm/entities/farm.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { ProduceStock } from '@/produce-stock/entities/produce-stock.entity/produce-stock.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProduceStockService {
  async createWithTransaction(
    manager: EntityManager,
    data: { produceItem: ProduceItem; farm: Farm; amount: number },
  ): Promise<ProduceStock> {
    const produceStock = manager.create(ProduceStock, {
      produceItem: data.produceItem,
      farm: data.farm,
      amount: data.amount,
    });
    return manager.save(ProduceStock, produceStock);
  }
}
