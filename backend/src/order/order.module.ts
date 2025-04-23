import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { DbModule } from '@/configs/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@/order/entities/order.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { ProduceStockModule } from '@/produce-stock/produce-stock.module';

@Module({
  imports: [
    DbModule,
    TypeOrmModule.forFeature([Order, ProduceItem]),
    ProduceStockModule,
  ],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule { }
