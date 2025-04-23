import { Order } from '@/order/entities/order.entity';
import { ShipmentStatus } from '@/shipment/enum/shipment-status.enum';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Shipment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  orderId: number;

  @Field(() => Order)
  @OneToOne(() => Order, (order) => order.shipment)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  shippedAt?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  deliveredAt?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date', nullable: true })
  estimatedDeliveryDate?: Date;

  @Field(() => ShipmentStatus)
  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.PENDING,
  })
  status: ShipmentStatus;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
