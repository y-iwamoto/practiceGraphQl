import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { User } from '@/user/user.entity';
import { DataSource } from 'typeorm';
import { Order } from '@/order/entities/order.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { ProduceStockService } from '@/produce-stock/produce-stock.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly produceStockService: ProduceStockService,
  ) { }

  async findOneOrThrow(id: number) {
    const order = await this.dataSource.getRepository(Order).findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('注文が見つかりません');
    }

    return order;
  }

  async create(createOrderInput: CreateOrderInput, currentUser: User) {
    return this.dataSource.transaction(async (manager) => {
      const produceItem = await manager.getRepository(ProduceItem).findOne({
        where: {
          id: createOrderInput.produceItemId,
          farmId: createOrderInput.farmId,
        },
        relations: {
          produceStock: true,
          farm: true,
        },
      });

      if (!produceItem) {
        throw new BadRequestException('生産品が見つかりません');
      }

      if (produceItem.produceStock.amount < createOrderInput.amount) {
        throw new BadRequestException('在庫が不足しています');
      }

      produceItem.produceStock.amount -= createOrderInput.amount;
      const order = manager.getRepository(Order).create({
        ...createOrderInput,
        orderedAt: new Date(),
        buyer: currentUser,
        farm: produceItem.farm,
        produceItem: produceItem,
      });

      await manager.save(order);

      await this.produceStockService.updateWithTransaction(manager, {
        produceStock: produceItem.produceStock,
        amount: produceItem.produceStock.amount,
      });

      return order;
    });
  }
}
