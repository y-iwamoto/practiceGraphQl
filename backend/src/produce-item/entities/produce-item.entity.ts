import { Farm } from '@/farm/entities/farm.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Length } from 'class-validator';
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
export class ProduceItem {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  @Length(1, 100)
  name: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  farmId: number;

  @Field(() => Farm)
  @ManyToOne(() => Farm, (farm) => farm.produceItems)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
