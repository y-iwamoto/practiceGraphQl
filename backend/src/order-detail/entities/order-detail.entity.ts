import { Order } from '@/order/entities/order.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class OrderDetail {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  orderId: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @Field(() => Int)
  @Column({ type: 'int' })
  produceItemId: number;

  @Field(() => ProduceItem)
  @ManyToOne(() => ProduceItem, (produceItem) => produceItem.orderDetails)
  @JoinColumn({ name: 'produceItemId' })
  produceItem: ProduceItem;

  @Field(() => Int)
  @Column({ type: 'int' })
  amount: number;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
