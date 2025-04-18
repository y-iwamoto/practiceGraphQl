import { Module } from '@nestjs/common';
import { ProduceStockService } from './produce-stock.service';
import { DbModule } from '@/configs/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduceStock } from '@/produce-stock/entities/produce-stock.entity/produce-stock.entity';
import { ProduceStockResolver } from './produce-stock.resolver';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([ProduceStock])],
  providers: [ProduceStockService, ProduceStockResolver],
  exports: [ProduceStockService],
})
export class ProduceStockModule { }
