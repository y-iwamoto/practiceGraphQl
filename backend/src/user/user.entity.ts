import { Role } from '@/auth/enum/role.enum';
import { Farm } from '@/farm/entities/farm.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  @Length(2, 55)
  firstName: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  @Length(2, 55)
  lastName: string;

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role, default: Role.Buyer })
  role: Role;

  @Field(() => [Farm], { nullable: true })
  @OneToMany(() => Farm, (farm) => farm.owner)
  farms?: Farm[];

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
