import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentInput } from './dto/create-shipment.input';
import { Repository } from 'typeorm';
import { Shipment } from '@/shipment/entities/shipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from '@/order/order.service';
import { UpdateShipmentInput } from '@/shipment/dto/update-shipment.input';
import { ShipmentStatus } from '@/shipment/enum/shipment-status.enum';

@Injectable()
export class ShipmentService {
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
      updateShipmentInput.status === ShipmentStatus.SHIPPED &&
      !shipment.shippedAt
    ) {
      shipment.shippedAt = new Date();
      shipment.estimatedDeliveryDate = new Date(
        shipment.shippedAt.getTime() + 7 * 24 * 60 * 60 * 1000,
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
      return this.shipmentRepository.save({
        ...shipment,
        ...updateShipmentInput,
      });
    }

    return shipment;
  }
}
