import { Injectable } from '@nestjs/common';
import { CreateProduceItemInput } from './dto/create-produce-item.input';
import { DataSource } from 'typeorm';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { FarmService } from '@/farm/farm.service';

@Injectable()
export class ProduceItemService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly farmService: FarmService,
  ) { }

  async create(createProduceItemInput: CreateProduceItemInput) {
    const farm = await this.farmService.findOne(createProduceItemInput.farmId);
    if (!farm) {
      throw new Error('農場が見つかりません');
    }
    const produceItem = this.dataSource.getRepository(ProduceItem).create({
      ...createProduceItemInput,
      farm,
    });
    return this.dataSource.getRepository(ProduceItem).save(produceItem);
  }

}
