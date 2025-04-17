import { ProduceItem } from '@/produce-item/entities/produce-item.entity';
import { User } from '@/user/user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Farm {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  @Length(1, 100)
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  @Length(7, 7)
  postalCode: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  @Length(1, 20)
  prefecture: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  @Length(1, 50)
  city: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  @Length(1, 100)
  restAddress: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  @Length(0, 100)
  building: string;

  @Index()
  @Column({ type: 'int' })
  ownerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.farms)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Field(() => [ProduceItem])
  @OneToMany(() => ProduceItem, (produceItem) => produceItem.farm)
  produceItems: ProduceItem[];

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
