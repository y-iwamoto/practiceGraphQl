import { Farm } from '@/farm/entities/farm.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { User } from '@/user/user.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
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
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  amount: number;

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

  @Field(() => Int)
  @Column({ type: 'int' })
  produceItemId: number;

  @Field(() => ProduceItem)
  @ManyToOne(() => ProduceItem, (produceItem) => produceItem.orders)
  @JoinColumn({ name: 'produceItemId' })
  produceItem: ProduceItem;

  @Field(() => Date)
  @Column({ type: 'timestamptz' })
  orderedAt: Date;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
