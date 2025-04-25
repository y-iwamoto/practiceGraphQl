import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { User } from '@/user/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { Order } from '@/order/entities/order.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { ProduceStockService } from '@/produce-stock/produce-stock.service';
import { OrderDetail } from '@/order-detail/entities/order-detail.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly produceStockService: ProduceStockService,
  ) { }

  async findOneOrThrow(id: number, manager?: EntityManager) {
    const repo =
      manager?.getRepository(Order) ?? this.dataSource.getRepository(Order);
    const order = await repo.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('注文が見つかりません');
    }

    return order;
  }

  async create(createOrderInput: CreateOrderInput, currentUser: User) {
    return this.dataSource.transaction(async (manager) => {
      // TODO: ここから確認
      const farm = currentUser.farms?.find(
        (farm) => farm.id === createOrderInput.farmId,
      );
      if (!farm) {
        throw new BadRequestException('農場が見つかりません');
      }


      const order = manager.getRepository(Order).create({
        orderedAt: new Date(),
        buyer: currentUser,
        farm,
      });

      await manager.save(order);

      for (const item of createOrderInput.produceItems) {
        const produceItem = await manager.getRepository(ProduceItem).findOne({
          where: {
            id: item.produceItemId,
            farmId: createOrderInput.farmId,
          },
          relations: {
            produceStock: true,
          },
        });

        if (!produceItem) {
          throw new BadRequestException(
            `生産品(ID: ${item.produceItemId})が見つかりません`,
          );
        }

        if (produceItem.produceStock.amount < item.amount) {
          throw new BadRequestException(
            `生産品(ID: ${item.produceItemId})の在庫が不足しています`,
          );
        }

        produceItem.produceStock.amount -= item.amount;

        const orderDetail = manager.getRepository(OrderDetail).create({
          ...item,
          order,
          produceItem,
        });

        await manager.save(orderDetail);

        await this.produceStockService.updateWithTransaction(manager, {
          produceStock: produceItem.produceStock,
          amount: produceItem.produceStock.amount,
        });
      }
      order.orderDetails = await manager.getRepository(OrderDetail).find({
        where: { orderId: order.id },
        relations: { produceItem: true },
      });
      return order;
    });
  }
}
