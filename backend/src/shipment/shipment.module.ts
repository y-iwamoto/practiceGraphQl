import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentResolver } from './shipment.resolver';
import { DbModule } from '@/configs/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from '@/shipment/entities/shipment.entity';
import { OrderModule } from '@/order/order.module';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Shipment]), OrderModule],
  providers: [ShipmentResolver, ShipmentService],
})
export class ShipmentModule { }
