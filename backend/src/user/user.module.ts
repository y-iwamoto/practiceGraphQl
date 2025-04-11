import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from 'src/configs/db.module';
import { User } from 'src/user/user.entity';
import { UserResolver } from 'src/user/user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
})
export class UserModule { }
