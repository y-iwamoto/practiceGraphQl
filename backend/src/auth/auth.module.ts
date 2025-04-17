import { Module } from '@nestjs/common';
import { DbModule } from '@/configs/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([User]), UserModule],
})
export class AuthModule { }
