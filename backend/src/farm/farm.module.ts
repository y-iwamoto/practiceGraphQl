import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmResolver } from './farm.resolver';
import { DbModule } from '@/configs/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from '@/farm/entities/farm.entity';
import { User } from '@/user/user.entity';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Farm, User]), UserModule],
  providers: [FarmResolver, FarmService],
  exports: [FarmService],
})
export class FarmModule { }
