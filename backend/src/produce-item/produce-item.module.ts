import { Module } from '@nestjs/common';
import { ProduceItemService } from './produce-item.service';
import { ProduceItemResolver } from './produce-item.resolver';
import { DbModule } from '@/configs/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { Farm } from '@/farm/entities/farm.entity';
import { FarmModule } from '@/farm/farm.module';
import { ProduceStock } from '@/produce-stock/entities/produce-stock.entity/produce-stock.entity';
import { ProduceStockModule } from '@/produce-stock/produce-stock.module';

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forFeature([ProduceItem, Farm, ProduceStock]),
    FarmModule,
    ProduceStockModule,
  ],

  providers: [ProduceItemResolver, ProduceItemService],
})
export class ProduceItemModule { }
