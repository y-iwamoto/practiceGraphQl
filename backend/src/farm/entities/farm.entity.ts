import { User } from '@/user/user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Farm {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  postalCode: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  prefecture: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  city: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  restAddress: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  building: string;

  @Column({ type: 'int' })
  ownerId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.farms)
  @JoinColumn({ name: 'ownerId' })
  owner: User;
}
