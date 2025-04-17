import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from '@/configs/db.module';
import { User } from '@/user/user.entity';
import { UserResolver } from '@/user/user.resolver';
import { UserService } from './user.service';
import { Farm } from '@/farm/entities/farm.entity';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([User, Farm])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule { }
