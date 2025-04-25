import { Farm } from '@/farm/entities/farm.entity';
import { OrderDetail } from '@/order-detail/entities/order-detail.entity';
import { OrderStatus } from '@/order/enum/order-status.enum';
import { Shipment } from '@/shipment/entities/shipment.entity';
import { User } from '@/user/user.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  buyerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @Field(() => Int)
  @Column({ type: 'int' })
  farmId: number;

  @Field(() => Farm)
  @ManyToOne(() => Farm, (farm) => farm.orders)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @Field(() => Shipment, { nullable: true })
  @OneToOne(() => Shipment, (shipment) => shipment.order)
  @JoinColumn({ name: 'shipmentId' })
  shipment: Shipment;

  @Field(() => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Field(() => Date)
  @Column({ type: 'timestamptz' })
  orderedAt: Date;

  @Field(() => [OrderDetail])
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
