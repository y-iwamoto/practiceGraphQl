import { Farm } from '@/farm/entities/farm.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { UpdateProduceStockInput } from '@/produce-stock/dto/update-produce-stock.input';
import { ProduceStock } from '@/produce-stock/entities/produce-stock.entity/produce-stock.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class ProduceStockService {
  constructor(private readonly dataSource: DataSource) { }

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

  async update(updateProduceStockInput: UpdateProduceStockInput) {
    const produceStock = await this.dataSource
      .getRepository(ProduceStock)
      .findOne({
        where: { id: updateProduceStockInput.id },
      });
    if (!produceStock) {
      throw new Error('ProduceStock not found');
    }
    produceStock.amount = updateProduceStockInput.amount;
    return this.dataSource.getRepository(ProduceStock).save(produceStock);
  }
}
