import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
