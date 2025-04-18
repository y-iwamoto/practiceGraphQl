import { Farm } from '@/farm/entities/farm.entity';
import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ProduceStock {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  amount: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  farmId: number;

  @Field(() => Farm)
  @ManyToOne(() => Farm, (farm) => farm.produceStocks)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @Field(() => Int)
  @Column({ type: 'int' })
  produceItemId: number;

  @Field(() => ProduceItem)
  @OneToOne(() => ProduceItem, (produceItem) => produceItem.produceStock)
  @JoinColumn({ name: 'produceItemId' })
  produceItem: ProduceItem;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
