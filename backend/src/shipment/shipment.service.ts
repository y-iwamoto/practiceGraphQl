import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Shipment } from '@/shipment/entities/shipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from '@/order/order.service';
import { UpdateShipmentInput } from '@/shipment/dto/update-shipment.input';
import { ShipmentStatus } from '@/shipment/enum/shipment-status.enum';
import { OrderStatus } from '@/order/enum/order-status.enum';

@Injectable()
export class ShipmentService {
  private readonly DEFAULT_DELIVERY_DAYS = 7;

  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    private readonly orderService: OrderService,
    private readonly dataSource: DataSource,
  ) { }

  async findOneOrThrow(id: number, manager?: EntityManager) {
    const repo = manager?.getRepository(Shipment) ?? this.shipmentRepository;
    const shipment = await repo.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!shipment) {
      throw new NotFoundException('出荷が見つかりません');
    }

    return shipment;
  }

  async create(createShipmentInput: CreateShipmentInput) {
    return this.dataSource.transaction(async (manager) => {
      const order = await this.orderService.findOneOrThrow(
        createShipmentInput.orderId,
        manager,
      );

      const existingShipment = await manager.findOne(Shipment, {
        where: { orderId: createShipmentInput.orderId },
      });

      if (existingShipment) {
        throw new BadRequestException(
          'この注文は既に出荷と関連付けられています',
        );
      }

      order.status = OrderStatus.CONFIRMED;
      await manager.save(order);

      const shipment = manager.create(Shipment, {
        ...createShipmentInput,
        order,
      });

      return manager.save(shipment);
    });
  }

  async update(updateShipmentInput: UpdateShipmentInput) {
    return this.dataSource.transaction(async (manager) => {
      const shipment = await this.findOneOrThrow(
        updateShipmentInput.id,
        manager,
      );
      let shouldSave = false;

      if (
        updateShipmentInput.status &&
        !this.isValidStatusTransition(
          shipment.status,
          updateShipmentInput.status,
        )
      ) {
        throw new BadRequestException(
          `${shipment.status}から${updateShipmentInput.status}へのステータス変更は許可されていません`,
        );
      }

      if (
        updateShipmentInput.status === ShipmentStatus.SHIPPED &&
        !shipment.shippedAt
      ) {
        shipment.shippedAt = new Date();
        shipment.estimatedDeliveryDate = this.calculateEstimatedDeliveryDate(
          shipment.shippedAt,
          this.DEFAULT_DELIVERY_DAYS,
        );
        shipment.order.status = OrderStatus.SHIPPED;
        shipment.order.shipment = shipment;
        shouldSave = true;
      } else if (
        updateShipmentInput.status === ShipmentStatus.DELIVERED &&
        !shipment.deliveredAt
      ) {
        shipment.deliveredAt = new Date();
        shipment.order.status = OrderStatus.DELIVERED;
        shipment.order.shipment = shipment;
        shouldSave = true;
      }

      if (shouldSave) {
        const updatedShipment = manager.merge(
          Shipment,
          shipment,
          updateShipmentInput,
        );
        await manager.save(shipment.order);

        return await manager.save(updatedShipment);
      }

      return shipment;
    });
  }

  private isValidStatusTransition(
    currentStatus: ShipmentStatus,
    newStatus: ShipmentStatus,
  ): boolean {
    const validTransitions: Record<ShipmentStatus, ShipmentStatus[]> = {
      [ShipmentStatus.PENDING]: [ShipmentStatus.SHIPPED],
      [ShipmentStatus.SHIPPED]: [ShipmentStatus.DELIVERED],
      [ShipmentStatus.DELIVERED]: [],
    };

    return validTransitions[currentStatus]?.includes(newStatus) ?? false;
  }

  private calculateEstimatedDeliveryDate(
    shippedAt: Date,
    deliveryDays: number,
  ): Date {
    const estimatedDate = new Date(shippedAt);
    estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);
    return estimatedDate;
  }
}
