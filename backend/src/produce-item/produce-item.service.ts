import { Injectable } from '@nestjs/common';
import { CreateProduceItemInput } from './dto/create-produce-item.input';
import { DataSource } from 'typeorm';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { FarmService } from '@/farm/farm.service';
import { ProduceStockService } from '@/produce-stock/produce-stock.service';

@Injectable()
export class ProduceItemService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly farmService: FarmService,
    private readonly produceStockService: ProduceStockService,
  ) { }

  async create(createProduceItemInput: CreateProduceItemInput) {
    const farm = await this.farmService.findOne(createProduceItemInput.farmId);
    if (!farm) {
      throw new Error('農場が見つかりません');
    }
    return this.dataSource.transaction(async (manager) => {
      const produceItem = manager.getRepository(ProduceItem).create({
        ...createProduceItemInput,
        farm,
      });

      await manager.save(produceItem);

      await this.produceStockService.createWithTransaction(manager, {
        produceItem,
        farm,
        amount: 10,
      });

      return manager.getRepository(ProduceItem).findOne({
        where: { id: produceItem.id },
        relations: ['farm', 'produceStock'],
      });
    });
  }
}
