import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { Repository } from 'typeorm';
import { Shipment } from '@/shipment/entities/shipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from '@/order/order.service';
import { UpdateShipmentInput } from '@/shipment/dto/update-shipment.input';
import { ShipmentStatus } from '@/shipment/enum/shipment-status.enum';

@Injectable()
export class ShipmentService {
  private readonly DEFAULT_DELIVERY_DAYS = 7;

  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    private readonly orderService: OrderService,
  ) { }

  async findOneOrThrow(id: number) {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
    });

    if (!shipment) {
      throw new NotFoundException('出荷が見つかりません');
    }

    return shipment;
  }

  async create(createShipmentInput: CreateShipmentInput) {
    const order = await this.orderService.findOneOrThrow(
      createShipmentInput.orderId,
    );

    const existingShipment = await this.shipmentRepository.findOne({
      where: { orderId: createShipmentInput.orderId },
    });

    if (existingShipment) {
      throw new BadRequestException('この注文は既に出荷と関連付けられています');
    }

    return this.shipmentRepository.save({
      ...createShipmentInput,
      order,
    });
  }

  async update(updateShipmentInput: UpdateShipmentInput) {
    const shipment = await this.findOneOrThrow(updateShipmentInput.id);
    let shouldSave = false;

    if (
      updateShipmentInput.status &&
      !this.isValidStatusTransition(shipment.status, updateShipmentInput.status)
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
      shouldSave = true;
    } else if (
      updateShipmentInput.status === ShipmentStatus.DELIVERED &&
      !shipment.deliveredAt
    ) {
      shipment.deliveredAt = new Date();
      shouldSave = true;
    }

    if (shouldSave) {
      const updatedShipment = this.shipmentRepository.merge(
        shipment,
        updateShipmentInput,
      );

      return this.shipmentRepository.save(updatedShipment);
    }

    return shipment;
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
